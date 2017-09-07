package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author Dominik Schwarz
 */
public interface UserRepository extends JpaRepository<User, Long> {

}
