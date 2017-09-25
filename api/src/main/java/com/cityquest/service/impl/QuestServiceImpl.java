package com.cityquest.service.impl;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.dto.QuestDto;
import com.cityquest.exception.ApiException;
import com.cityquest.exception.BadRequestException;
import com.cityquest.persistence.model.*;
import com.cityquest.persistence.repository.EventQuestRepository;
import com.cityquest.persistence.repository.FixedQuestRepository;
import com.cityquest.persistence.repository.QuestRepository;
import com.cityquest.persistence.repository.UserRepository;
import com.cityquest.service.QuestService;
import com.cityquest.util.UserInfo;
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

    @Autowired private FixedQuestRepository fixedQuestRepository;

    @Autowired private EventQuestRepository eventQuestRepository;

    @Autowired private QuestRepository questRepository;

    @Autowired private UserRepository userRepository;

    @Override
    public List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status) {
        logger.info("find fixed quests by status " + status);
        return fixedQuestRepository.findByStatus(status).stream().map(s -> FixedQuestDto.of(s)).collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findEventQuestsByStatus(QuestStatus status) {
        logger.info("find event quests by status " + status);
        return eventQuestRepository.findByStatus(status).stream().map(s -> EventQuestDto.of(s)).collect(Collectors.toList());
    }

    @Override
    public List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status, String accessToken) throws ApiException {
        String auth0UserId = getAuth0UserId(accessToken);
        logger.info("find fixed quests by status " + status + " for user "+auth0UserId);
        return fixedQuestRepository.findByStatus(status).stream().map(q -> {
            FixedQuestDto questDto = FixedQuestDto.of(q);
            questDto.setRegistered(isRegistered(q,auth0UserId));
            return questDto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findEventQuestsByStatus(QuestStatus status, String accessToken) throws ApiException {
        String auth0UserId = getAuth0UserId(accessToken);
        logger.info("find event quests by status " + status + " for user "+auth0UserId);
        return eventQuestRepository.findByStatus(status).stream().map(q -> {
            EventQuestDto questDto = EventQuestDto.of(q);
            questDto.setRegistered(isRegistered(q,auth0UserId));
            return questDto;
        }).collect(Collectors.toList());
    }

    @Override
    public QuestDto registerForQuest(Long questId, String accessToken) throws ApiException, BadRequestException {

        String auth0UserId = getAuth0UserId(accessToken);
        logger.info("register quest " + questId + " for auth0-user " + auth0UserId);

        Quest quest = questRepository.findOne(questId);
        User user = userRepository.findByAuth0Id(auth0UserId);

        if (user == null || quest == null) {
            throw new BadRequestException("Can't find quest or user");
        }
        checkRegistrationPeriod(quest);
        List<Quest> questList = user.getQuests();
        if (questList == null || questList.contains(quest)) {
            throw new BadRequestException("User is already registered for quest");
        }
        questList.add(quest);
        userRepository.save(user);

        QuestDto registeredQuest = QuestDto.of(quest);
        registeredQuest.setRegistered(true);
        return registeredQuest;
    }

    @Override
    public QuestDto unregisterFromQuest(Long questId, String accessToken) throws ApiException, BadRequestException {

        String auth0UserId = getAuth0UserId(accessToken);
        logger.info("unregister quest " + questId + " for auth0-user " + auth0UserId);

        Quest quest = questRepository.findOne(questId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if (user == null || quest == null) {
            throw new BadRequestException("Can't find quest or user");
        }
        checkRegistrationPeriod(quest);
        List<Quest> questList = user.getQuests();
        if (questList == null || !questList.contains(quest)) {
            throw new BadRequestException("User is not registered for quest");
        }
        questList.remove(quest);
        userRepository.save(user);

        QuestDto unregisteredQuest = QuestDto.of(quest);
        unregisteredQuest.setRegistered(false);
        return unregisteredQuest;
    }

    private void checkRegistrationPeriod(Quest quest) {
        if (quest instanceof EventQuest) {
            EventQuest eventQ = (EventQuest) quest;
            if (eventQ.getRegistrationEnd().before(new Date()))
                throw new BadRequestException("Registration period already ended");
            if (eventQ.getRegistrationStart().after(new Date()))
                throw new BadRequestException("Registration period not started");
        }
    }

    @Override
    public List<FixedQuestDto> findFixedQuestsOfUser(String accessToken) throws ApiException {

        String auth0UserId = getAuth0UserId(accessToken);
        logger.info("find fixed quests of user " + auth0UserId);

        User user = userRepository.findByAuth0Id(auth0UserId);
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
    public List<EventQuestDto> findEventQuestsOfUser(String accessToken) throws ApiException {

        String auth0UserId = getAuth0UserId(accessToken);
        logger.info("find event quests of user " + auth0UserId);

        User user = userRepository.findByAuth0Id(auth0UserId);
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

    private String getAuth0UserId(String accessToken) {
        try {
            return UserInfo.getAuth0UserId(accessToken);
        }
        catch (Exception e) {
            throw new ApiException("Error while fetching user infos");
        }
    }

    private Boolean isRegistered(Quest quest, String auth0UserId) {

        User user = userRepository.findByAuth0Id(auth0UserId);
        if (user == null || quest == null) {
            throw new ApiException("Can't find quest or user");
        }
        List<Quest> questList = user.getQuests();
        return questList != null && questList.contains(quest);
    }
}
