package com.cityquest.service.impl;

import com.cityquest.persistence.model.User;
import com.cityquest.persistence.repository.UserRepository;
import com.cityquest.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Dominik Schwarz on 03.10.2017.
 */
@Service
public class UserServiceImpl implements UserService {

    private static final String SECRET_TOKEN = "SA27i(52QcQ4";
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired private UserRepository userRepo;

    @Override
    public Boolean createUser(String auth0UserId, String secretToken) {
        if (auth0UserId == null || secretToken == null) {
            return false;
        }
        logger.info("create new user with auth0UserId "+auth0UserId);
        if (!secretToken.equals(SECRET_TOKEN) || userRepo.findByAuth0Id(auth0UserId) != null) {
            return false;
        }
        userRepo.save(new User(auth0UserId));
        return true;
    }
}
