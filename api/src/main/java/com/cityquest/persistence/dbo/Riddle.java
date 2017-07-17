package com.cityquest.persistence.dbo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * @author Dominik Schwarz
 */
@Entity
public class Riddle {

	@Id @GeneratedValue
	private Long id;
	private String name;
	private String description;
	private String solution;
	private RiddleType type;
	private RiddleGenre genre;
	private String attachment;

	private Riddle() {}

	public Riddle(String name, String description, String solution, RiddleType type, RiddleGenre genre) {
		this.name = name;
		this.description = description;
		this.solution = solution;
		this.type = type;
		this.genre = genre;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getSolution() {
		return solution;
	}

	public void setSolution(String solution) {
		this.solution = solution;
	}

	public RiddleType getType() {
		return type;
	}

	public void setType(RiddleType type) {
		this.type = type;
	}

	public RiddleGenre getGenre() {
		return genre;
	}

	public void setGenre(RiddleGenre genre) {
		this.genre = genre;
	}

	public String getAttachement() {
		return attachment;
	}

	public void setAttachement(String attachement) {
		this.attachment = attachement;
	}
}
