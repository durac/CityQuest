package com.cityquest.persistence.repository;

import com.cityquest.persistence.dbo.EventQuest;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface EventQuestRepository extends PagingAndSortingRepository<EventQuest, Long> {

}
