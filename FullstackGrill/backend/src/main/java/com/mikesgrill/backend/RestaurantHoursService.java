package com.mikesgrill.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantHoursService {

    private final RestaurantHoursRepository restaurantHoursRepository;

    public RestaurantHoursService(RestaurantHoursRepository restaurantHoursRepository) {
        this.restaurantHoursRepository = restaurantHoursRepository;
    }

    public List<RestaurantHours> getAllHours() {
        return restaurantHoursRepository.findAllByOrderBySortOrderAsc();
    }

    public Optional<RestaurantHours> getHoursById(Long id) {
        return restaurantHoursRepository.findById(id);
    }

    public RestaurantHours saveHours(RestaurantHours restaurantHours) {
        return restaurantHoursRepository.save(restaurantHours);
    }

    public List<RestaurantHours> saveAllHours(List<RestaurantHours> restaurantHoursList) {
        for (RestaurantHours incoming : restaurantHoursList) {
            if (incoming.getId() == null) {
                continue;
            }

            restaurantHoursRepository.findById(incoming.getId()).ifPresent(existing -> {
                existing.setOpenTime(incoming.getOpenTime());
                existing.setCloseTime(incoming.getCloseTime());
                existing.setClosed(incoming.isClosed());
                restaurantHoursRepository.save(existing);
            });
        }
        return restaurantHoursRepository.findAllByOrderBySortOrderAsc();
    }

    public Optional<RestaurantHours> updateHours(Long id, RestaurantHours updatedHours) {
        return restaurantHoursRepository.findById(id).map(existing -> {
            existing.setOpenTime(updatedHours.getOpenTime());
            existing.setCloseTime(updatedHours.getCloseTime());
            existing.setClosed(updatedHours.isClosed());
            return restaurantHoursRepository.save(existing);
        });
    }

    @PostConstruct
    public void initializeDefaultHours() {
        if (restaurantHoursRepository.count() > 0) {
            return;
        }

        List<RestaurantHours> defaultHours = Arrays.asList(
                new RestaurantHours("Monday", "11:00 AM", "9:00 PM", false, 1),
                new RestaurantHours("Tuesday", "11:00 AM", "9:00 PM", false, 2),
                new RestaurantHours("Wednesday", "11:00 AM", "9:00 PM", false, 3),
                new RestaurantHours("Thursday", "11:00 AM", "9:00 PM", false, 4),
                new RestaurantHours("Friday", "11:00 AM", "10:00 PM", false, 5),
                new RestaurantHours("Saturday", "11:00 AM", "10:00 PM", false, 6),
                new RestaurantHours("Sunday", "", "", true, 7)
        );

        restaurantHoursRepository.saveAll(defaultHours);
    }
}
