package com.cityquest.persistence.model;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Dominik Schwarz
 */
@Entity
public class SolvedQuestStation implements Serializable {

    @EmbeddedId private SolvedQuestStationId id;

    @ManyToOne(fetch = FetchType.EAGER) @MapsId("userId") private User user;

    @ManyToOne(fetch = FetchType.EAGER) @MapsId("questStationId") private QuestStation questStation;

    private Date startDate;

    private Date endDate;

    private Boolean scannedQR = false;

    public SolvedQuestStation() {
    }

    public SolvedQuestStation(User user, QuestStation questStation, Date startDate, Boolean scannedQR) {
        this.user = user;
        this.questStation = questStation;
        this.startDate = startDate;
        this.scannedQR = scannedQR;
        this.id = new SolvedQuestStationId(user.getId(), questStation.getId());
    }

    /* Only for testing */
    public SolvedQuestStation(User user, QuestStation questStation, Date startDate, Date endDate, Boolean scannedQR) {
        this.user = user;
        this.questStation = questStation;
        this.startDate = startDate;
        this.endDate = endDate;
        this.scannedQR = scannedQR;
        this.id = new SolvedQuestStationId(user.getId(), questStation.getId());
    }

    public SolvedQuestStationId getId() {
        return id;
    }

    public void setId(SolvedQuestStationId id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public QuestStation getQuestStation() {
        return questStation;
    }

    public void setQuestStation(QuestStation questStation) {
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
