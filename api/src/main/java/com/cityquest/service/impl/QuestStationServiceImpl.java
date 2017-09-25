package com.cityquest.service.impl;

import com.cityquest.dto.QuestStationDto;
import com.cityquest.exception.ApiException;
import com.cityquest.exception.BadRequestException;
import com.cityquest.exception.WrongSolutionException;
import com.cityquest.persistence.model.*;
import com.cityquest.persistence.repository.QuestRepository;
import com.cityquest.persistence.repository.QuestStationRepository;
import com.cityquest.persistence.repository.SolvedQuestStationRepository;
import com.cityquest.persistence.repository.UserRepository;
import com.cityquest.service.QuestStationService;
import com.cityquest.util.UserInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

/**
 * Created by Dominik Schwarz on 25.09.2017.
 */
@Service
public class QuestStationServiceImpl implements QuestStationService{

    private static final Logger logger = LoggerFactory.getLogger(QuestStationServiceImpl.class);

    @Autowired private QuestServiceImpl questService;

    @Autowired private QuestStationRepository questStationRepo;

    @Autowired private SolvedQuestStationRepository solvedQuestStationRepo;

    @Autowired private QuestRepository questRepo;

    @Autowired private UserRepository userRepo;

    @Override
    public QuestStationDto currentQuestStation(Long questId, String accessToken) throws ApiException {
        String auth0UserId = UserInfo.getAuth0UserId(accessToken);
        logger.info("current quest station for quest " + questId + " and user "+auth0UserId);

        Quest quest = questRepo.findOne(questId);
        User user = userRepo.findByAuth0Id(auth0UserId);
        if(!questService.isRegistered(quest, user)) {
            throw new BadRequestException("User is not registered for quest");
        }

        return QuestStationDto.of(currentStation(quest,user));
    }

    @Override
    public QuestStationDto nextQuestStation(Long questId, String answer, String accessToken) throws ApiException {
        if(answer == null) {
            throw new IllegalArgumentException("Answer is not defined");
        }

        String auth0UserId = UserInfo.getAuth0UserId(accessToken);
        logger.info("next quest station for quest " + questId + " and user "+auth0UserId);

        Quest quest = questRepo.findOne(questId);
        User user = userRepo.findByAuth0Id(auth0UserId);
        isActive(quest);
        if(!questService.isRegistered(quest, user)) {
            throw new BadRequestException("User is not registered for quest");
        }

        QuestStation current = currentStation(quest, user);
        if(current == null) {
            return null;
        }
        //Compare answer with solution
        String solution = current.getRiddle().getSolution();
        System.out.println(answer);
        if(!solution.replace(" ","").equalsIgnoreCase(answer.replace(" ",""))) {
            throw new WrongSolutionException("Unfortunately, this isn't correct!");
        }

        Date deliveryDate = new Date();
        SolvedQuestStation solved = solvedQuestStationRepo.findByUserAndQuestStation(user, current);
        solved.setEndDate(deliveryDate);
        solvedQuestStationRepo.save(solved);
        QuestStation next = questStationRepo.findByQuestAndSeqNr(quest, current.getSeqNr()+1);
        if(next != null){
            SolvedQuestStation start = new SolvedQuestStation(user, next, deliveryDate);
            solvedQuestStationRepo.save(start);
        }

        return QuestStationDto.of(next);
    }

    private void isActive(Quest quest) {
        if (quest.getStatus() != QuestStatus.ACTIVE)
            throw new BadRequestException("Quest is not active");
        if (quest instanceof EventQuest) {
            EventQuest eventQ = (EventQuest) quest;
            if (eventQ.getStartDate().after(new Date()))
                throw new BadRequestException("Quest hasn't started yet");
            if (eventQ.getEndDate().before(new Date()))
                throw new BadRequestException("Quest is already closed");
        }
    }

    private QuestStation currentStation(Quest quest, User user){
        List<QuestStation> questStations = questStationRepo.findByQuestOrderBySeqNrAsc(quest);
        for (QuestStation station : questStations) {
            for(SolvedQuestStation solved : station.getUsers()) {
                if(solved.getUser().equals(user) && solved.getStartDate() != null &&
                        solved.getEndDate() == null) {
                    return station;
                }
            }
        }
        return null;
    }

}
