package com.cityquest.security;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

/**
 * Created by Dominik Schwarz on 24.07.2017.
 */
@EnableWebSecurity
@Configuration
@PropertySource("classpath:auth0.properties")
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Value(value = "${auth0.apiAudience}") private String apiAudience;

    @Value(value = "${auth0.issuer}") private String issuer;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        JwtWebSecurityConfigurer.forRS256(apiAudience, issuer)
                .configure(http)
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/")
                .permitAll()
                .antMatchers(HttpMethod.GET, "/api/activeFixedQuests", "/api/openedEventQuests")
                .permitAll()
                .antMatchers(HttpMethod.POST, "/api/registerForQuest", "/api/unregisterFromQuest")
                .hasAuthority("create:register_for_quest")
                .antMatchers(HttpMethod.GET, "/api/fixedQuestsOfUser", "/api/eventQuestsOfUser")
                .hasAuthority("read:user_quests")
                .anyRequest()
                .authenticated();
    }
}
