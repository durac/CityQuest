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

    List<EventQuestDto> findOpenedEventQuests();

    List<FixedQuestDto> findFixedQuestsByStatus(QuestStatus status, String auth0UserId);

    List<EventQuestDto> findOpenedEventQuests(String auth0UserId);

    QuestDto registerForQuest(Long questId, String auth0UserId) throws ApiException;

    QuestDto unregisterFromQuest(Long questId, String auth0UserId) throws ApiException;

    List<FixedQuestDto> findFixedQuestsOfUser(String auth0UserId) throws ApiException;

    List<EventQuestDto> findEventQuestsOfUser(String auth0UserId) throws ApiException;
}
