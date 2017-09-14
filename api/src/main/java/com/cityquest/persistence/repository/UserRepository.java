package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

    User findByAuth0Id(String auth0Id);

}
