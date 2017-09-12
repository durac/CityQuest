package com.cityquest.dto;

import com.cityquest.persistence.model.EventQuest;
import com.cityquest.persistence.model.Quest;

import java.util.Date;

/**
 * @author Dominik Schwarz
 */
public class EventQuestDto extends Quest {

    private Date startDate;

    private Date endDate;

    private Integer minStarter;

    private Integer maxStarter;

    private Date registrationStart;

    private Date registrationEnd;

    private String prize;

    public static EventQuestDto of(EventQuest quest) {
        if (quest == null) {
            return null;
        }

        EventQuestDto questDto = new EventQuestDto();
        questDto.setId(quest.getId());
        questDto.setName(quest.getName());
        questDto.setStatus(quest.getStatus());
        questDto.setDescription(quest.getDescription());
        questDto.setDifficulty(quest.getDifficulty());
        questDto.setDuration(quest.getDuration());
        questDto.setArea(quest.getArea());
        questDto.setImage(quest.getImage());
        questDto.setStartDate(quest.getStartDate());
        questDto.setEndDate(quest.getEndDate());
        questDto.setMinStarter(quest.getMinStarter());
        questDto.setMaxStarter(quest.getMaxStarter());
        questDto.setRegistrationStart(quest.getRegistrationStart());
        questDto.setRegistrationEnd(quest.getRegistrationEnd());
        questDto.setPrize(quest.getPrize());

        return questDto;
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
