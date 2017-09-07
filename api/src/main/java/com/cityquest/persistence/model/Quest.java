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

    private String area;

    @OneToMany(mappedBy = "quest") private List<QuestStation> questStations = new ArrayList<>();

    @ManyToMany(
            mappedBy = "quests") private List<User> users =
            new ArrayList<>();

    public Quest() {
    }

    public Quest(String name, QuestStatus status, String description) {
        this.name = name;
        this.status = status;
        this.description = description;
    }

    public Quest(String name, QuestStatus status, String description, QuestDifficulty difficulty, Integer duration,
            String area) {
        this.name = name;
        this.status = status;
        this.description = description;
        this.difficulty = difficulty;
        this.duration = duration;
        this.area = area;
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

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
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
