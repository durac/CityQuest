package com.cityquest.service;

import com.cityquest.dto.QuestStationDto;
import com.cityquest.exception.ApiException;
import org.springframework.stereotype.Service;

/**
 * Created by Dominik Schwarz on 25.09.2017.
 */
@Service
public interface QuestStationService {

    QuestStationDto currentQuestStation(Long questId, String accessToken) throws ApiException;

    QuestStationDto nextQuestStation(Long questId, String answer, String accessToken) throws ApiException;

}
