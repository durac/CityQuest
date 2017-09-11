package com.cityquest.controller;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.service.QuestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Controller
public class QuestController {

    private static final Logger logger = LoggerFactory.getLogger(QuestController.class);

    private QuestService questService;

    @RequestMapping(method = RequestMethod.GET, value = "/activeFixedQuests")
    public List<FixedQuestDto> getActiveFixedQuests() {
        return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/openedEventQuests")
    public List<EventQuestDto> getOpenedEventQuests() {
        return questService.findEventQuestsByStatus(QuestStatus.REGISTRATION);
    }

}
