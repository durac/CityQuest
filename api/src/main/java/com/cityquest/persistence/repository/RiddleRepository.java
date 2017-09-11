package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.Riddle;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface RiddleRepository extends PagingAndSortingRepository<Riddle, Long> {

}
