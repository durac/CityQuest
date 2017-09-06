package com.cityquest.persistence.repository;

import com.cityquest.persistence.dbo.FixedQuest;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface FixedQuestRepository extends PagingAndSortingRepository<FixedQuest, Long> {

}
