package com.github.fauu.natrank.repository;

import com.github.fauu.natrank.model.entity.RankingEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RankingEntryRepository extends JpaRepository<RankingEntry, Integer> {

}
