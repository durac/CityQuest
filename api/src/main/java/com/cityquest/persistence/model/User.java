package com.cityquest.persistence.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Entity
@Table(name = "city_quest_user")
public class User implements Serializable {

    @Id @GeneratedValue private Long id;

    @Column(name = "auth0_id", unique = true, nullable = false) private String auth0Id;

    @Column(unique = true) private String username;

    @Column(unique = true) private String email;

    private String firstname;

    private String lastname;

    private Integer age;

    private Integer qPoints;

    @OneToMany(
            mappedBy = "user",
            orphanRemoval = true) private List<SolvedQuestStation> solvedQuestStations = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE) @JoinTable(
            name = "user_quest",
            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "quest_id", referencedColumnName = "id")) private List<Quest> quests = new ArrayList<>();

    private User() {
    }

    public User(String auth0Id) {
        this.auth0Id = auth0Id;
    }

    public User(String username, String firstname, String lastname, Integer age, Integer qPoints) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.qPoints = qPoints;
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

    public List<SolvedQuestStation> getSolvedQuestStations() {
        return solvedQuestStations;
    }

    public void setSolvedQuestStations(List<SolvedQuestStation> solvedQuestStations) {
        this.solvedQuestStations = solvedQuestStations;
    }

    public void addCurrentQuestStation(QuestStation qs) {
        if (solvedQuestStations != null && !solvedQuestStations.isEmpty()) {
            solvedQuestStations.get(solvedQuestStations.size() - 1).setEndDate(new Date());
        }
        SolvedQuestStation solvedQS = new SolvedQuestStation(this, qs);
        solvedQS.setStartDate(new Date());
        solvedQuestStations.add(solvedQS);
        qs.getUsers().add(solvedQS);
    }

    public List<Quest> getQuests() {
        return quests;
    }

    public void setQuests(List<Quest> quests) {
        this.quests = quests;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        User user = (User) o;

        return auth0Id.equals(user.auth0Id);

    }

    @Override
    public int hashCode() {
        return auth0Id.hashCode();
    }
}
