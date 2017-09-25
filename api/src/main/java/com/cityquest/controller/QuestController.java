package com.cityquest.controller;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.dto.QuestDto;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.service.QuestService;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
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

    @Autowired private QuestService questService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/activeFixedQuests")
    public List<FixedQuestDto> getActiveFixedQuests(HttpServletRequest request) {
        if (request.getHeader("Authorization") == null) {
            return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE);
        } else {
            return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE, request.getHeader("Authorization"));
        }
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/openedEventQuests")
    public List<EventQuestDto> getOpenedEventQuests(HttpServletRequest request) {
        if (request.getHeader("Authorization") == null) {
            return questService.findOpenedEventQuests();
        } else {
            return questService.findOpenedEventQuests(request.getHeader("Authorization"));
        }

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
