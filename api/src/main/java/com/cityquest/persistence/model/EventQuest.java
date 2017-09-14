package com.cityquest.persistence.model;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Dominik Schwarz
 */
@Entity
public class EventQuest extends Quest implements Serializable {

    private Date startDate;

    private Date endDate;

    private Integer minStarter;

    private Integer maxStarter;

    private Date registrationStart;

    private Date registrationEnd;

    private String prize;

    private EventQuest() {
    }

    public EventQuest(String name, QuestStatus status, String description) {
        super(name, status, description);
    }

    public EventQuest(String name, QuestStatus status, String description, QuestDifficulty difficulty, Integer duration,
            Double distance, String area, String image, Date startDate, Date endDate, Integer minStarter, Integer maxStarter,
            Date registrationStart, Date registrationEnd, String prize) {
        super(name, status, description, difficulty, duration, distance, area, image);
        this.startDate = startDate;
        this.endDate = endDate;
        this.minStarter = minStarter;
        this.maxStarter = maxStarter;
        this.registrationStart = registrationStart;
        this.registrationEnd = registrationEnd;
        this.prize = prize;
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

    public Integer getMinStarter() {
        return minStarter;
    }

    public void setMinStarter(Integer minStarter) {
        this.minStarter = minStarter;
    }

    public Integer getMaxStarter() {
        return maxStarter;
    }

    public void setMaxStarter(Integer maxStarter) {
        this.maxStarter = maxStarter;
    }

    public Date getRegistrationStart() {
        return registrationStart;
    }

    public void setRegistrationStart(Date registrationStart) {
        this.registrationStart = registrationStart;
    }

    public Date getRegistrationEnd() {
        return registrationEnd;
    }

    public void setRegistrationEnd(Date registrationEnd) {
        this.registrationEnd = registrationEnd;
    }

    public String getPrize() {
        return prize;
    }

    public void setPrize(String prize) {
        this.prize = prize;
    }
}
