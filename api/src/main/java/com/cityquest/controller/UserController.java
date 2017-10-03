package com.cityquest.controller;

import com.cityquest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Dominik Schwarz on 03.10.2017.
 */
@RestController
public class UserController {

    @Autowired private UserService userService;

    @RequestMapping(method = RequestMethod.POST, value = "/api/createUser")
    public Boolean createUser(String userId, String secretToken) {
        return userService.createUser(userId, secretToken);
    }

}
