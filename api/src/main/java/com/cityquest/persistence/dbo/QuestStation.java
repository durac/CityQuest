package com.cityquest.persistence.dbo;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Dominik Schwarz
 */
@Entity
public class QuestStation implements Serializable {

	@Id @GeneratedValue
	private Long id;
	@Column(name = "seq_nr")
	private Integer seqNr;
	private String name;
	private String description;
	@ManyToOne
	@JoinColumn(name = "quest_id")
	private Quest quest;
	private Double latitude;
	private Double longitude;
	private String qrcode;
	@ManyToOne
	@JoinColumn(name = "riddle_id")
	private Riddle riddle;
	@OneToMany(
			mappedBy = "questStation",
			cascade = CascadeType.ALL,
			orphanRemoval = true
	)
	private List<SolvedQuestStation> users = new ArrayList<>();

	private QuestStation() {}

	public QuestStation(Integer seqNr, String name, String description, Quest quest, Riddle riddle, Double latitude, Double longitude, String qrcode) {
		this.seqNr = seqNr;
		this.name = name;
		this.description = description;
		this.quest = quest;
		this.riddle = riddle;
		this.latitude = latitude;
		this.longitude = longitude;
		this.qrcode = qrcode;
	}

	public Quest getQuest() {
		return quest;
	}

	public void setQuest(Quest quest) {
		this.quest = quest;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getSeqNr() {
		return seqNr;
	}

	public void setSeqNr(Integer seqNr) {
		this.seqNr = seqNr;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Riddle getRiddle() {
		return riddle;
	}

	public void setRiddle(Riddle riddle) {
		this.riddle = riddle;
	}

	public Double getLatitude() {
		return latitude;
	}

	public void setLatitude(Double latitude) {
		this.latitude = latitude;
	}

	public Double getLongitude() {
		return longitude;
	}

	public void setLongitude(Double longitude) {
		this.longitude = longitude;
	}

	public String getQrcode() {
		return qrcode;
	}

	public void setQrcode(String qrcode) {
		this.qrcode = qrcode;
	}

	public List<SolvedQuestStation> getUsers() {
		return users;
	}

	public void setUsers(List<SolvedQuestStation> users) {
		this.users = users;
	}
}
