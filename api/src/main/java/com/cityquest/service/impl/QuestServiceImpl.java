package com.cityquest.service.impl;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.persistence.model.*;
import com.cityquest.persistence.repository.EventQuestRepository;
import com.cityquest.persistence.repository.FixedQuestRepository;
import com.cityquest.persistence.repository.QuestRepository;
import com.cityquest.persistence.repository.UserRepository;
import com.cityquest.service.QuestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        return fixedQuestRepository.findByStatus(status)
                .stream()
                .map(s -> FixedQuestDto.of(s))
                .collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findEventQuestsByStatus(QuestStatus status) {
        logger.info("find event quests by status " + status);

        return eventQuestRepository.findByStatus(status)
                .stream()
                .map(s -> EventQuestDto.of(s))
                .collect(Collectors.toList());
    }

    @Override
    public Boolean registerForQuest(Long questId, String auth0UserId) {
        logger.info("register quest "+questId+" for auth0-user "+auth0UserId);
        Quest quest = questRepository.findOne(questId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if(user == null || quest == null) {
            return false;
        }
        List<Quest> questList = user.getQuests();
        if(questList == null || questList.contains(quest)){
            return false;
        }
        questList.add(quest);
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean unregisterForQuest(Long questId, String auth0UserId) {
        logger.info("unregister quest "+questId+" for auth0-user "+auth0UserId);
        Quest quest = questRepository.findOne(questId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if(user == null || quest == null) {
            return false;
        }
        List<Quest> questList = user.getQuests();
        if(questList == null){
            return false;
        }
        questList.remove(quest);
        userRepository.save(user);
        return true;
    }

    @Override
    public Boolean isRegistered(Long questId, String auth0UserId) {
        logger.info("is user "+auth0UserId+" registered for quest "+questId);
        Quest quest = questRepository.findOne(questId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if(user == null || quest == null) {
            //error
            return false;
        }
        List<Quest> questList = user.getQuests();
        if(questList != null && questList.contains(quest)){
            return true;
        }
        return false;
    }

    @Override
    public List<FixedQuestDto> findFixedQuestsOfUser(String auth0UserId) {
        logger.info("find fixed quests of user " + auth0UserId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if(user == null) {
            return null;
        }
        return user.getQuests()
                .stream()
                .filter(q -> q instanceof FixedQuest)
                .map (q -> FixedQuestDto.of((FixedQuest) q))
                .collect(Collectors.toList());
    }

    @Override
    public List<EventQuestDto> findEventQuestsOfUser(String auth0UserId) {
        logger.info("find event quests of user " + auth0UserId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if(user == null) {
            return null;
        }
        return user.getQuests()
                .stream()
                .filter(q -> q instanceof EventQuest)
                .map (q -> EventQuestDto.of((EventQuest) q))
                .collect(Collectors.toList());
    }
}
