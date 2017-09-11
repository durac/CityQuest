package com.cityquest.dto;

import com.cityquest.persistence.model.FixedQuest;

/**
 * @author Dominik Schwarz
 */
public class FixedQuestDto extends QuestDto {

    public static FixedQuestDto of(FixedQuest quest) {
        if (quest == null) {
            return null;
        }

        FixedQuestDto questDto = new FixedQuestDto();
        questDto.setId(quest.getId());
        questDto.setName(quest.getName());
        questDto.setStatus(quest.getStatus());
        questDto.setDescription(quest.getDescription());
        questDto.setDifficulty(quest.getDifficulty());
        questDto.setDuration(quest.getDuration());
        questDto.setArea(quest.getArea());

        return questDto;
    }
}
