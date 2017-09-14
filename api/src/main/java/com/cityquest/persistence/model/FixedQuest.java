package com.cityquest.persistence.model;

import javax.persistence.Entity;
import java.io.Serializable;

/**
 * @author Dominik Schwarz
 */
@Entity
public class FixedQuest extends Quest implements Serializable {

    private FixedQuest() {
    }

    public FixedQuest(String name, QuestStatus status, String description) {
        super(name, status, description);
    }

    public FixedQuest(String name, QuestStatus status, String description, QuestDifficulty difficulty, Integer duration,
            Double distance, String area, String image) {
        super(name, status, description, difficulty, duration, distance, area, image);
    }
}
