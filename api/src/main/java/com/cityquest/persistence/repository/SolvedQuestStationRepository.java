package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.SolvedQuestStation;
import com.cityquest.persistence.model.SolvedQuestStationId;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dominik Schwarz
 */
public interface SolvedQuestStationRepository extends JpaRepository<SolvedQuestStation, SolvedQuestStationId> {

}
