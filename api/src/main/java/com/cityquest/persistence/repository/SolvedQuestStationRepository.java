package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.QuestStation;
import com.cityquest.persistence.model.SolvedQuestStation;
import com.cityquest.persistence.model.SolvedQuestStationId;
import com.cityquest.persistence.model.User;
import org.springframework.data.repository.CrudRepository;

/**
 * @author Dominik Schwarz
 */
public interface SolvedQuestStationRepository extends CrudRepository<SolvedQuestStation, SolvedQuestStationId> {

    SolvedQuestStation findByUserAndQuestStation(User user, QuestStation questStation);

}
