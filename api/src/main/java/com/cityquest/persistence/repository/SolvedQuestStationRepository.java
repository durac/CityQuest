package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.SolvedQuestStation;
import com.cityquest.persistence.model.SolvedQuestStationId;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Dominik Schwarz
 */
public interface SolvedQuestStationRepository extends CrudRepository<SolvedQuestStation, SolvedQuestStationId> {

}
