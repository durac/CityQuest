package com.cityquest.persistence.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;

/**
 * @author Dominik Schwarz
 */
@Entity
public class Riddle implements Serializable {

    @Id @GeneratedValue private Long id;

    @Column(unique = true) private String name;

    @Column(columnDefinition = "TEXT") private String description;

    private String solution;

    private RiddleType type;

    private RiddleCategory category;

    private String attachment;

    private Boolean used;

    private Riddle() {
    }

    public Riddle(String name, String description, String solution, RiddleType type, RiddleCategory category) {
        this.name = name;
        this.description = description;
        this.solution = solution;
        this.type = type;
        this.category = category;
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

    public RiddleCategory getCategory() {
        return category;
    }

    public void setCategory(RiddleCategory category) {
        this.category = category;
    }

    public String getAttachement() {
        return attachment;
    }

    public void setAttachement(String attachment) {
        this.attachment = attachment;
    }

    public Boolean getUsed() {
        return used;
    }

    public void setUsed(Boolean used) {
        this.used = used;
    }
}
