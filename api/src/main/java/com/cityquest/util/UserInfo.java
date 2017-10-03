package com.cityquest.util;

import com.cityquest.exception.ApiException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

/**
 * Created by Dominik Schwarz on 18.09.2017.
 */
public class UserInfo {

    private static final Logger logger = LoggerFactory.getLogger(UserInfo.class);

    private static final String USERINFO_URI = "https://cityquest.eu.auth0.com/userinfo";

    public static JSONObject getUserInfo(String accessToken) throws ApiException{
        logger.info("obtaining userinfo");
        JSONObject jsonObject;
        try {

            RestTemplate restTemplate = new RestTemplate();

            HttpHeaders headers = new HttpHeaders();
            headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
            headers.put("Authorization", Arrays.asList(accessToken));

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(USERINFO_URI, HttpMethod.GET, entity, String.class);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(response.getBody());
            return (JSONObject) obj;
        } catch (RestClientException e) {
            throw new ApiException(e.getMessage());
        } catch (ParseException e) {
            throw new ApiException("Error parsing user infos");
        }
    }

    public static String getAuth0UserId() {
        logger.info("obtaining auth0 user id from accessToken");
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth.getPrincipal() == null || auth.getPrincipal().toString().equals("anonymousUser")) {
            return null;
        }
        return auth.getPrincipal().toString();
    }

}
