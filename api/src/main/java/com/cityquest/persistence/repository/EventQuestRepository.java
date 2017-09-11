package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.EventQuest;
import com.cityquest.persistence.model.QuestStatus;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author Dominik Schwarz
 */
public interface EventQuestRepository extends PagingAndSortingRepository<EventQuest, Long> {

    List<EventQuest> findByStatus(QuestStatus status);

}
