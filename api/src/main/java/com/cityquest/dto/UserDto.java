package com.cityquest.dto;

import com.cityquest.persistence.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Dominik Schwarz
 */
public class UserDto {

    private Long id;

    private String auth0Id;

    private String username;

    private String email;

    private String firstname;

    private String lastname;

    private Integer age;

    private Integer qPoints;

    private List<SolvedQuestStationDto> solvedQuestStations = new ArrayList<>();

    private List<QuestDto> quests = new ArrayList<>();

    public static UserDto of(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setAuth0Id(user.getAuth0Id());
        userDto.setUsername(user.getUsername());
        userDto.setEmail(user.getEmail());
        userDto.setLastname(user.getLastname());
        userDto.setAge(user.getAge());
        userDto.setqPoints(user.getqPoints());
        userDto.setQuests(user.getQuests().stream().map(s -> QuestDto.of(s)).collect(Collectors.toList()));

        return userDto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAuth0Id() {
        return auth0Id;
    }

    public void setAuth0Id(String auth0Id) {
        this.auth0Id = auth0Id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Integer getqPoints() {
        return qPoints;
    }

    public void setqPoints(Integer qPoints) {
        this.qPoints = qPoints;
    }

    public List<SolvedQuestStationDto> getSolvedQuestStations() {
        return solvedQuestStations;
    }

    public void setSolvedQuestStations(List<SolvedQuestStationDto> solvedQuestStations) {
        this.solvedQuestStations = solvedQuestStations;
    }

    public List<QuestDto> getQuests() {
        return quests;
    }

    public void setQuests(List<QuestDto> quests) {
        this.quests = quests;
    }
}
