package com.example.alltogether.repository;

import com.example.alltogether.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlaceRepository extends JpaRepository<Place, Long> {
    List<Place> findByCityId(Long cityId);
    List<Place> findByCategory(String category);
}
