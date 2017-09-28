package com.cityquest.dto;

import com.cityquest.persistence.model.QuestStation;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
public class QuestStationDto {

    private Long id;

    private Integer seqNr;

    private String name;

    private String description;

    private QuestDto quest;

    private Double latitude;

    private Double longitude;

    private String qrcode;

    private RiddleDto riddle;

    private Boolean finished;

    public static QuestStationDto of(QuestStation questStation) {
        if (questStation == null) {
            return null;
        }

        QuestStationDto questStationDto = new QuestStationDto();
        questStationDto.setId(questStation.getId());
        questStationDto.setSeqNr(questStation.getSeqNr());
        questStationDto.setName(questStation.getName());
        questStationDto.setDescription(questStation.getDescription());
        questStationDto.setLatitude(questStation.getLatitude());
        questStationDto.setLongitude(questStation.getLongitude());
        questStationDto.finished = false;

        return questStationDto;
    }

    private List<SolvedQuestStationDto> users = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public QuestDto getQuest() {
        return quest;
    }

    public void setQuest(QuestDto quest) {
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

    public RiddleDto getRiddle() {
        return riddle;
    }

    public void setRiddle(RiddleDto riddle) {
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

    public List<SolvedQuestStationDto> getUsers() {
        return users;
    }

    public void setUsers(List<SolvedQuestStationDto> users) {
        this.users = users;
    }

    public Boolean getFinished() {
        return finished;
    }

    public void setFinished(Boolean finished) {
        this.finished = finished;
    }
}
