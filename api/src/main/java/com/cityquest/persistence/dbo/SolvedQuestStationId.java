package com.cityquest.persistence.dbo;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author Dominik Schwarz
 */
@Embeddable
public class SolvedQuestStationId implements Serializable {

	@Column(name = "user_id")
	private Long userId;
	@Column(name = "queststation_id")
	private Long questStationId;

	private SolvedQuestStationId(){}

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
}
