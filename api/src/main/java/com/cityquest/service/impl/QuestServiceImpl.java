package com.cityquest.service.impl;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.dto.QuestDto;
import com.cityquest.exception.ApiException;
import com.cityquest.exception.BadRequestException;
import com.cityquest.persistence.model.*;
import com.cityquest.persistence.repository.*;
import com.cityquest.service.QuestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Dominik Schwarz on 11.09.2017.
 */
@Service
public class QuestServiceImpl implements QuestService {

    private static final Logger logger = LoggerFactory.getLogger(QuestServiceImpl.class);

    @Autowired private FixedQuestRepository fixedQuestRepo;

    @Autowired private EventQuestRepository eventQuestRepo;

    @Autowired private QuestStationRepository questStationRepo;

    @Autowired private SolvedQuestStationRepository solvedQuestStationRepo;

    @Autowired private QuestRepository questRepo;

    @Autowired private UserRepository userRepo;

    @Override
    public List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status) {
        logger.info("find fixed quests by status " + status);

        return fixedQuestRepo.findByStatus(status).stream().map(s -> FixedQuestDto.of(s)).collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findOpenedEventQuests() {
        logger.info("find event quests opened for registration");

        return eventQuestRepo.findOpenedForRegistration()
                .stream().map(s -> EventQuestDto.of(s)).collect(Collectors.toList());
    }

    @Override
    public List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status, String auth0UserId) throws ApiException {
        logger.info("find fixed quests by status " + status + " for user "+auth0UserId);

        User user = userRepo.findByAuth0Id(auth0UserId);
        return fixedQuestRepo.findByStatus(status).stream().map(q -> {
            FixedQuestDto questDto = FixedQuestDto.of(q);
            questDto.setRegistered(isRegistered(q,user));
            return questDto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findOpenedEventQuests(String auth0UserId) throws ApiException {
        logger.info("find event quests opened for registration for user "+auth0UserId);

        User user = userRepo.findByAuth0Id(auth0UserId);
        return eventQuestRepo.findOpenedForRegistration()
                .stream().map(q -> {
            EventQuestDto questDto = EventQuestDto.of(q);
            questDto.setRegistered(isRegistered(q,user));
            return questDto;
        }).collect(Collectors.toList());
    }

    @Override
    public QuestDto registerForQuest(Long questId, String auth0UserId) throws ApiException {
        logger.info("register quest " + questId + " for auth0-user " + auth0UserId);

        Quest quest = questRepo.findOne(questId);
        User user = userRepo.findByAuth0Id(auth0UserId);

        if (user == null || quest == null) {
            throw new BadRequestException("Can't find quest or user");
        }
        checkRegistrationPeriod(quest);
        List<Quest> questList = user.getQuests();
        if (questList == null || questList.contains(quest)) {
            throw new BadRequestException("User is already registered for quest");
        }
        questList.add(quest);
        userRepo.save(user);

        List<QuestStation> stations = questStationRepo.findByQuestOrderBySeqNrAsc(quest);
        if(!stations.isEmpty()){
            Date startDate = new Date();
            if(quest instanceof EventQuest) {
                startDate = ((EventQuest) quest).getStartDate();
            }
            SolvedQuestStation start = new SolvedQuestStation(user, stations.get(0), startDate, true);
            solvedQuestStationRepo.save(start);
        }

        QuestDto registeredQuest = QuestDto.of(quest);
        registeredQuest.setRegistered(true);
        return registeredQuest;
    }

    @Override
    public QuestDto unregisterFromQuest(Long questId, String auth0UserId) throws ApiException {
        logger.info("unregister quest " + questId + " for auth0-user " + auth0UserId);

        Quest quest = questRepo.findOne(questId);
        User user = userRepo.findByAuth0Id(auth0UserId);
        if (user == null || quest == null) {
            throw new BadRequestException("Can't find quest or user");
        }
        checkRegistrationPeriod(quest);
        List<Quest> questList = user.getQuests();
        if (questList == null || !questList.contains(quest)) {
            throw new BadRequestException("User is not registered for quest");
        }
        questList.remove(quest);
        userRepo.save(user);

        QuestDto unregisteredQuest = QuestDto.of(quest);
        unregisteredQuest.setRegistered(false);
        return unregisteredQuest;
    }

    @Override
    public List<FixedQuestDto> findFixedQuestsOfUser(String auth0UserId) throws ApiException {
        logger.info("find fixed quests of user " + auth0UserId);

        User user = userRepo.findByAuth0Id(auth0UserId);
        if (user == null) {
            throw new BadRequestException("Can't find user");
        }
        return user.getQuests()
                .stream()
                .filter(q -> q instanceof FixedQuest)
                .map(q -> {
                    FixedQuestDto questDto = FixedQuestDto.of((FixedQuest) q);
                    questDto.setRegistered(true);
                    return questDto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findEventQuestsOfUser(String auth0UserId) throws ApiException {
        logger.info("find event quests of user " + auth0UserId);

        User user = userRepo.findByAuth0Id(auth0UserId);
        if (user == null) {
            throw new BadRequestException("Can't find user");
        }
        return user.getQuests()
                .stream()
                .filter(q -> q instanceof EventQuest)
                .map(q -> {
                    EventQuestDto questDto = EventQuestDto.of((EventQuest) q);
                    questDto.setRegistered(true);
                    return questDto;
                })
                .collect(Collectors.toList());
    }

    private void checkRegistrationPeriod(Quest quest) {
        if(quest.getStatus() != QuestStatus.ACTIVE) {
            throw new BadRequestException("Quest is not active");
        }
        if (quest instanceof EventQuest) {
            EventQuest eventQ = (EventQuest) quest;
            if (eventQ.getRegistrationStart().after(new Date()))
                throw new BadRequestException("Registration period not started");
            if (eventQ.getRegistrationEnd().before(new Date()))
                throw new BadRequestException("Registration period already ended");
        }
    }


    public Boolean isRegistered(Quest quest, User user) {

        if (user == null || quest == null) {
            throw new ApiException("Can't find quest or user");
        }
        List<Quest> questList = user.getQuests();
        return questList != null && questList.contains(quest);
    }
}
