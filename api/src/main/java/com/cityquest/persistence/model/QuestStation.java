package com.cityquest.persistence.model;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Entity
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames = {"seq_nr", "quest_id"})
})
public class QuestStation implements Serializable {

    @Id @GeneratedValue private Long id;

    @Column(name = "seq_nr") private Integer seqNr;

    private String name;

    private String description;

    @ManyToOne @JoinColumn(name = "quest_id") private Quest quest;

    private Double latitude;

    private Double longitude;

    private String qrcode;

    @ManyToOne(fetch = FetchType.EAGER) @JoinColumn(name = "riddle_id") private Riddle riddle;

    @LazyCollection(LazyCollectionOption.FALSE) @OneToMany(
            mappedBy = "questStation",
            orphanRemoval = true) private List<SolvedQuestStation> users = new ArrayList<>();

    private QuestStation() {
    }

    public QuestStation(Integer seqNr, String name, String description, Quest quest, Riddle riddle, Double latitude,
            Double longitude, String qrcode) {
        this.seqNr = seqNr;
        this.name = name;
        this.description = description;
        this.quest = quest;
        this.riddle = riddle;
        this.latitude = latitude;
        this.longitude = longitude;
        this.qrcode = qrcode;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Quest getQuest() {
        return quest;
    }

    public void setQuest(Quest quest) {
        this.quest = quest;
    }

    public Integer getSeqNr() {
        return seqNr;
    }

    public void setSeqNr(Integer seqNr) {
        this.seqNr = seqNr;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Riddle getRiddle() {
        return riddle;
    }

    public void setRiddle(Riddle riddle) {
        this.riddle = riddle;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getQrcode() {
        return qrcode;
    }

    public void setQrcode(String qrcode) {
        this.qrcode = qrcode;
    }

    public List<SolvedQuestStation> getUsers() {
        return users;
    }

    public void setUsers(List<SolvedQuestStation> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        QuestStation that = (QuestStation) o;

        if (seqNr != null ? !seqNr.equals(that.seqNr) : that.seqNr != null)
            return false;
        return quest != null ? quest.getId().equals(that.quest.getId()) : that.quest == null;

    }

    @Override
    public int hashCode() {
        int result = seqNr != null ? seqNr.hashCode() : 0;
        result = 31 * result + (quest != null ? quest.hashCode() : 0);
        return result;
    }
}
