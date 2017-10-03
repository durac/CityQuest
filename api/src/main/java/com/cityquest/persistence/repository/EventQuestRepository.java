package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.EventQuest;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author Dominik Schwarz
 */
public interface EventQuestRepository extends PagingAndSortingRepository<EventQuest, Long> {

    @Query(value="select q from EventQuest q where q.status = com.cityquest.persistence.model.QuestStatus.ACTIVE and "
            + "q.registrationStart < CURRENT_TIMESTAMP and q.registrationEnd > CURRENT_TIMESTAMP")
    List<EventQuest> findOpenedForRegistration();


}
