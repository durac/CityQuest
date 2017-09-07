package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.EventQuest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dominik Schwarz
 */
public interface EventQuestRepository extends JpaRepository<EventQuest, Long> {

}
