package com.cityquest.util;

import com.cityquest.exception.ApiException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;

/**
 * Created by Dominik Schwarz on 18.09.2017.
 */
public class UserInfo {

    private static final Logger logger = LoggerFactory.getLogger(UserInfo.class);

    private static final String USERINFO_URI = "https://cityquest.eu.auth0.com/userinfo";

    private static ResponseEntity<String> getUserInfo(String accessToken) throws RestClientException{

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Arrays.asList(MediaType.APPLICATION_JSON));
        headers.put("Authorization", Arrays.asList(accessToken));

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        return restTemplate.exchange(USERINFO_URI, HttpMethod.GET, entity, String.class);
    }

    public static String getAuth0UserId(String accessToken) throws ApiException{
        JSONObject jsonObject;
        try {
            ResponseEntity<String> response = getUserInfo(accessToken);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(response.getBody());
            jsonObject = (JSONObject) obj;
        } catch (RestClientException e) {
            throw new ApiException(e.getMessage());
        } catch (ParseException e) {
            throw new ApiException("Error while parsing user infos");
        }
        String[] result = jsonObject.get("sub").toString().split("\\|");
        if (result.length != 2){
            throw new ApiException("Error while parsing user infos");
        }

        return result[1];
    }

}
