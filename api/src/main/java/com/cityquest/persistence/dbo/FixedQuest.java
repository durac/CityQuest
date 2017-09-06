package com.cityquest.persistence.dbo;

import javax.persistence.Entity;
import java.io.Serializable;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Entity
public class FixedQuest extends Quest implements Serializable{

	public FixedQuest(String name, QuestStatus status, String description) {
		super(name, status, description);
	}

	public FixedQuest(String name, QuestStatus status, String description, QuestDifficulty difficulty, Integer duration,
			String area, List<QuestStation> questStations) {
		super(name, status, description, difficulty, duration, area, questStations);
	}
}
