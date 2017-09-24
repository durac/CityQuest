package com.cityquest.dto;

import com.cityquest.persistence.model.*;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
public class QuestDto {

    private Long id;

    private String name;

    private QuestStatus status;

    private String description;

    private QuestDifficulty difficulty;

    private Integer duration;

    private Double distance;

    private String area;

    private String image;

    private List<QuestStationDto> questStations = new ArrayList<>();

    private List<UserDto> users = new ArrayList<>();

    private Boolean isRegistered;

    public static QuestDto of(Quest quest) {

        if (quest == null) {
            return null;
        }
        if (quest instanceof FixedQuest) {
            return FixedQuestDto.of((FixedQuest) quest);
        }

        return EventQuestDto.of((EventQuest) quest);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public QuestStatus getStatus() {
        return status;
    }

    public void setStatus(QuestStatus status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public QuestDifficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(QuestDifficulty difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public List<QuestStationDto> getQuestStations() {
        return questStations;
    }

    public void setQuestStations(List<QuestStationDto> questStations) {
        this.questStations = questStations;
    }

    public List<UserDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserDto> users) {
        this.users = users;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getRegistered() {
        return isRegistered;
    }

    public void setRegistered(Boolean registered) {
        isRegistered = registered;
    }
}
