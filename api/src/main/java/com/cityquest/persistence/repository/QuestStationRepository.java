package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.QuestStation;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dominik Schwarz
 */
public interface QuestStationRepository extends JpaRepository<QuestStation, Long> {

}
