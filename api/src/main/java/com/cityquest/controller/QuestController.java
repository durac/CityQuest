package com.cityquest.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Dominik Schwarz
 */
@Controller
public class QuestController {

    private static final Logger logger = LoggerFactory.getLogger(QuestController.class);

    @RequestMapping(method = RequestMethod.GET, value = "/fixedQuests")
    public String getFixedQuests() {
        return "index";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/openedEventQuests")
    public String getOpenedEventQuests() {
        return "index";
    }

}
