package com.cityquest.service.impl;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.persistence.repository.EventQuestRepository;
import com.cityquest.persistence.repository.FixedQuestRepository;
import com.cityquest.service.QuestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Dominik Schwarz on 11.09.2017.
 */
public class QuestServiceImpl implements QuestService {

    private static final Logger logger = LoggerFactory.getLogger(QuestServiceImpl.class);

    @Autowired private FixedQuestRepository fixedQuestRepository;

    @Autowired private EventQuestRepository eventQuestRepository;

    @Override
    public List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status) {
        logger.info("find fixed quests by status " + status);

        return fixedQuestRepository.findByStatus(status)
                .stream()
                .map(s -> (FixedQuestDto) FixedQuestDto.of(s))
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
}
