package com.cityquest.controller;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.dto.QuestDto;
import com.cityquest.persistence.model.QuestStatus;
import com.cityquest.service.QuestService;
import com.cityquest.util.UserInfo;
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
    public List<FixedQuestDto> getActiveFixedQuests() {
        String aut0UserId = UserInfo.getAuth0UserId();
        if (aut0UserId == null) {
            return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE);
        }
        return questService.findFixedQuestsByStatus(QuestStatus.ACTIVE, aut0UserId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/openedEventQuests")
    public List<EventQuestDto> getOpenedEventQuests() {
        String aut0UserId = UserInfo.getAuth0UserId();
        if (aut0UserId == null) {
            return questService.findOpenedEventQuests();
        }
        return questService.findOpenedEventQuests(aut0UserId);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/registerForQuest")
    public QuestDto registerForQuest(Long questId) {
        return questService.registerForQuest(questId, UserInfo.getAuth0UserId());
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/unregisterFromQuest")
    public QuestDto unregisterFromQuest(Long questId) {
        return questService.unregisterFromQuest(questId, UserInfo.getAuth0UserId());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/fixedQuestsOfUser")
    public List<FixedQuestDto> getFixedQuestsOfUser() {

        return questService.findFixedQuestsOfUser(UserInfo.getAuth0UserId());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/eventQuestsOfUser")
    public List<EventQuestDto> getEventQuestsOfUser() {
        return questService.findEventQuestsOfUser(UserInfo.getAuth0UserId());
    }

}
