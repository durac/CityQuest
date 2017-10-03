package com.cityquest.controller;

import com.cityquest.dto.QuestStationDto;
import com.cityquest.service.QuestStationService;
import com.cityquest.util.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Dominik Schwarz
 */
@RestController
public class QuestStationController {

    @Autowired private QuestStationService questStationService;

    @RequestMapping(method = RequestMethod.GET, value = "/api/currentQuestStation")
    public QuestStationDto currentQuestStation(Long questId) {
        return questStationService.currentQuestStation(questId, UserInfo.getAuth0UserId());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/nextQuestStation")
    public QuestStationDto nextQuestStation(Long questId, String answer) {
        return questStationService.nextQuestStation(questId, answer, UserInfo.getAuth0UserId());
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/getRiddle")
    public QuestStationDto getRiddle(Long questId, String code) {
        return questStationService.getRiddle(questId, code, UserInfo.getAuth0UserId());
    }
}
