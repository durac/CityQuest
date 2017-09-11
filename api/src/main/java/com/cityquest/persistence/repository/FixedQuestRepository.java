package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.FixedQuest;
import com.cityquest.persistence.model.QuestStatus;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author Dominik Schwarz
 */
public interface FixedQuestRepository extends PagingAndSortingRepository<FixedQuest, Long> {

    List<FixedQuest> findByStatus(QuestStatus status);

}
