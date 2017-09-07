package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.FixedQuest;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dominik Schwarz
 */
public interface FixedQuestRepository extends JpaRepository<FixedQuest, Long> {

}
