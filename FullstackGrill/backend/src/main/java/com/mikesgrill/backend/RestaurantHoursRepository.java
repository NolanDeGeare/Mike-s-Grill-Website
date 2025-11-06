package com.mikesgrill.backend;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RestaurantHoursRepository extends JpaRepository<RestaurantHours, Long> {
    List<RestaurantHours> findAllByOrderBySortOrderAsc();
}
