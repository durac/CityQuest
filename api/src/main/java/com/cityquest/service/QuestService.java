package com.cityquest.service;

import com.cityquest.dto.EventQuestDto;
import com.cityquest.dto.FixedQuestDto;
import com.cityquest.dto.QuestDto;
import com.cityquest.exception.ApiException;
import com.cityquest.persistence.model.QuestStatus;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Dominik Schwarz on 11.09.2017.
 */

@Service
public interface QuestService {

    List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status);

    List<EventQuestDto> findEventQuestsByStatus(QuestStatus status);

    QuestDto registerForQuest(Long questId, String accessToken) throws ApiException;

    QuestDto unregisterFromQuest(Long questId, String accessToken) throws ApiException;

    Boolean isRegistered(Long questId, String accessToken) throws ApiException;

    List<FixedQuestDto> findFixedQuestsOfUser(String accessToken) throws ApiException;

    List<EventQuestDto> findEventQuestsOfUser(String accessToken) throws ApiException;
}
