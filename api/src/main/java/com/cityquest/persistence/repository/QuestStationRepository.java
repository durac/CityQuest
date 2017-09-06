package com.cityquest.persistence.repository;

import com.cityquest.persistence.dbo.QuestStation;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface QuestStationRepository extends PagingAndSortingRepository<QuestStation, Long> {

}
