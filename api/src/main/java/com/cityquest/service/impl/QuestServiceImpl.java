package com.cityquest.service.impl;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.persistence.model.Quest;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.persistence.model.User;
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
    public void registerForQuest(Long questId, String auth0UserId) {
        logger.info("register quest "+questId+" for auth0-user "+auth0UserId);
        Quest quest = questRepository.findOne(questId);
        User user = userRepository.findByAuth0Id(auth0UserId);
        if(user == null || quest == null) {
            return;
        }
        List<Quest> questList = user.getQuests();
        if(questList != null && !questList.contains(quest)){
            user.getQuests().add(quest);
            quest.getUsers().add(user);
            userRepository.save(user);
        }
    }
}
