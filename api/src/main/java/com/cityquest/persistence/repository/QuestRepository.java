package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.Quest;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface QuestRepository extends PagingAndSortingRepository<Quest, Long> {

}
