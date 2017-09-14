package com.cityquest.persistence.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Entity
public class Quest implements Serializable {

    @Id @GeneratedValue private Long id;

    @Column(unique = true) private String name;

    private QuestStatus status;

    private String description;

    private QuestDifficulty difficulty;

    private Integer duration;

    private Double distance;

    private String area;

    private String image;

    @OneToMany(mappedBy = "quest") private List<QuestStation> questStations = new ArrayList<>();

    @ManyToMany(
            mappedBy = "quests") private List<User> users = new ArrayList<>();

    public Quest() {
    }

    public Quest(String name, QuestStatus status, String description) {
        this.name = name;
        this.status = status;
        this.description = description;
    }

    public Quest(String name, QuestStatus status, String description, QuestDifficulty difficulty, Integer duration,
            Double distance, String area, String image) {
        this.name = name;
        this.status = status;
        this.description = description;
        this.difficulty = difficulty;
        this.duration = duration;
        this.distance = distance;
        this.area = area;
        this.image = image;
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

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<QuestStation> getQuestStations() {
        return questStations;
    }

    public void setQuestStations(List<QuestStation> questStations) {
        this.questStations = questStations;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
