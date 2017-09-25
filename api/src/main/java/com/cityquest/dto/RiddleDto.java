package com.cityquest.dto;

import com.cityquest.persistence.model.Riddle;
import com.cityquest.persistence.model.RiddleCategory;
import com.cityquest.persistence.model.RiddleType;

/**
 * @author Dominik Schwarz
 */
public class RiddleDto {

    private Long id;

    private String name;

    private String description;

    private String solution;

    private RiddleType type;

    private RiddleCategory category;

    private String attachment;

    private Boolean used;

    public static RiddleDto of(Riddle riddle) {
        if (riddle == null) {
            return null;
        }

        RiddleDto riddleDto = new RiddleDto();
        riddleDto.setId(riddle.getId());
        riddleDto.setName(riddle.getName());
        riddleDto.setDescription(riddle.getDescription());
        //Do not send solution to client
        //riddleDto.setSolution(riddle.getSolution());
        riddleDto.setType(riddle.getType());
        riddleDto.setCategory(riddle.getCategory());
        riddleDto.setAttachement(riddle.getAttachement());
        riddleDto.setUsed(riddle.getUsed());

        return riddleDto;
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
