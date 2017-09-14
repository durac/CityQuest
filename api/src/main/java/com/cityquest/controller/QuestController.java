package com.cityquest.controller;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.service.QuestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author Dominik Schwarz
 */
@RestController
public class QuestController {

    private static final Logger logger = LoggerFactory.getLogger(QuestController.class);

    @Autowired
    private QuestService questService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/activeFixedQuests")
    public List<FixedQuestDto> getActiveFixedQuests() {
        return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/openedEventQuests")
    public List<EventQuestDto> getOpenedEventQuests() {
        return questService.findEventQuestsByStatus(QuestStatus.REGISTRATION);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/registerForQuest")
    public void registerForQuest(Long questId, String auth0UserId) {
        questService.registerForQuest(questId, auth0UserId);
    }
}
