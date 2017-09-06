package com.cityquest.persistence.repository;

import com.cityquest.persistence.dbo.User;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Dominik Schwarz
 */
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

}
