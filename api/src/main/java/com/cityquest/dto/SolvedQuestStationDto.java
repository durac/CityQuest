package com.cityquest.dto;

import com.cityquest.persistence.model.SolvedQuestStation;

import java.util.Date;

/**
 * @author Dominik Schwarz
 */
public class SolvedQuestStationDto {

    private UserDto user;

    private QuestStationDto questStation;

    private Date startDate;

    private Date endDate;

    private Boolean scannedQR;

    public static SolvedQuestStationDto of(SolvedQuestStation solvedQuestStation) {
        if (solvedQuestStation == null) {
            return null;
        }

        SolvedQuestStationDto solvedQuestStationDto = new SolvedQuestStationDto();
        solvedQuestStationDto.setUser(UserDto.of(solvedQuestStation.getUser()));
        solvedQuestStationDto.setQuestStation(QuestStationDto.of(solvedQuestStation.getQuestStation()));
        solvedQuestStationDto.setStartDate(solvedQuestStation.getStartDate());
        solvedQuestStationDto.setEndDate(solvedQuestStation.getEndDate());
        solvedQuestStationDto.setScannedQR(solvedQuestStation.getScannedQR());

        return solvedQuestStationDto;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public QuestStationDto getQuestStation() {
        return questStation;
    }

    public void setQuestStation(QuestStationDto questStation) {
        this.questStation = questStation;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Boolean getScannedQR() {
        return scannedQR;
    }

    public void setScannedQR(Boolean scannedQR) {
        this.scannedQR = scannedQR;
    }
}
