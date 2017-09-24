package com.cityquest.controller;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.dto.QuestDto;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.service.QuestService;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
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

    @Autowired private QuestService questService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/activeFixedQuests")
    public List<FixedQuestDto> getActiveFixedQuests() {
        return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/openedEventQuests")
    public List<EventQuestDto> getOpenedEventQuests() {
        return questService.findEventQuestsByStatus(QuestStatus.REGISTRATION);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/isRegistered")
    public Boolean isRegistered(Long questId, HttpServletRequest request) {
        return questService.isRegistered(questId, request.getHeader("Authorization"));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/registerForQuest")
    public QuestDto registerForQuest(Long questId, HttpServletRequest request) {
        return questService.registerForQuest(questId, request.getHeader("Authorization"));
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/unregisterFromQuest")
    public QuestDto unregisterFromQuest(Long questId, HttpServletRequest request) {
        return questService.unregisterFromQuest(questId, request.getHeader("Authorization"));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/fixedQuestsOfUser")
    public List<FixedQuestDto> getFixedQuestsOfUser(HttpServletRequest request) {
        return questService.findFixedQuestsOfUser(request.getHeader("Authorization"));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/eventQuestsOfUser")
    public List<EventQuestDto> getEventQuestsOfUser(HttpServletRequest request) {
        return questService.findEventQuestsOfUser(request.getHeader("Authorization"));
    }

}
