package com.cityquest.service;

import org.springframework.stereotype.Service;

/**
 * Created by Dominik Schwarz on 03.10.2017.
 */
@Service
public interface UserService {

    Boolean createUser(String auth0UserId, String secretToken);

}
