package com.cityquest.persistence.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author Dominik Schwarz
 */
@Embeddable
public class SolvedQuestStationId implements Serializable {

    @Column(name = "user_id") private Long userId;

    @Column(name = "queststation_id") private Long questStationId;

    public SolvedQuestStationId() {
    }

    public SolvedQuestStationId(Long userId, Long questStationId) {
        this.userId = userId;
        this.questStationId = questStationId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getQuestStationId() {
        return questStationId;
    }

    public void setQuestStationId(Long questStationId) {
        this.questStationId = questStationId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        SolvedQuestStationId that = (SolvedQuestStationId) o;

        if (userId != null ? !userId.equals(that.userId) : that.userId != null)
            return false;
        return questStationId != null ? questStationId.equals(that.questStationId) : that.questStationId == null;

    }

    @Override
    public int hashCode() {
        int result = userId != null ? userId.hashCode() : 0;
        result = 31 * result + (questStationId != null ? questStationId.hashCode() : 0);
        return result;
    }
}
