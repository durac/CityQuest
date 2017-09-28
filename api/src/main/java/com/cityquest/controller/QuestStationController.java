package com.cityquest.controller;

import com.cityquest.dto.QuestStationDto;
import com.cityquest.service.QuestStationService;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
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
    public QuestStationDto currentQuestStation(Long questId, HttpServletRequest request) {
        return questStationService.currentQuestStation(questId, request.getHeader("Authorization"));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/nextQuestStation")
    public QuestStationDto nextQuestStation(Long questId, String answer, HttpServletRequest request) {
        return questStationService.nextQuestStation(questId, answer, request.getHeader("Authorization"));
    }

    @RequestMapping(method = RequestMethod.GET, value = "/api/getRiddle")
    public QuestStationDto getRiddle(Long questId, String code, HttpServletRequest request) {
        return questStationService.getRiddle(questId, code, request.getHeader("Authorization"));
    }
}
