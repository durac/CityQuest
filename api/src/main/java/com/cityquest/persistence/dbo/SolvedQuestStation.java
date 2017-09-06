package com.cityquest.persistence.dbo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Dominik Schwarz
 */
@Entity
public class SolvedQuestStation implements Serializable {

	@EmbeddedId
	private SolvedQuestStationId id;
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("userId")
	private User user;
	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("questStationId")
	private QuestStation questStation;
	private Date startDate;
	private Date endDate;

	private SolvedQuestStation(){}

	public SolvedQuestStation(User user, QuestStation questStation) {
		this.user = user;
		this.questStation = questStation;
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
}
