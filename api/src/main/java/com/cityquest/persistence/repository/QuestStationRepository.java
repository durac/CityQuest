package com.cityquest.persistence.repository;

import com.cityquest.persistence.model.Quest;
import com.cityquest.persistence.model.QuestStation;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author Dominik Schwarz
 */
public interface QuestStationRepository extends PagingAndSortingRepository<QuestStation, Long> {

    List<QuestStation> findByQuestOrderBySeqNrAsc(Quest quest);

    QuestStation findByQuestAndSeqNr(Quest quest, Integer seqNr);
}
