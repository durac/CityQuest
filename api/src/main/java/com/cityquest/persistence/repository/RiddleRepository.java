package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.Riddle;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dominik Schwarz
 */
public interface RiddleRepository extends JpaRepository<Riddle, Long> {

}
