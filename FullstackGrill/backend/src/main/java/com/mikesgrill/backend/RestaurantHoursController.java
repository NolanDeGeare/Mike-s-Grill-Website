package com.mikesgrill.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RestaurantHoursController {

    private final RestaurantHoursService restaurantHoursService;

    public RestaurantHoursController(RestaurantHoursService restaurantHoursService) {
        this.restaurantHoursService = restaurantHoursService;
    }

    @GetMapping("/api/public/hours")
    public List<RestaurantHours> getPublicHours() {
        return restaurantHoursService.getAllHours();
    }

    @GetMapping("/api/admin/hours")
    public List<RestaurantHours> getAdminHours() {
        return restaurantHoursService.getAllHours();
    }

    @PutMapping("/api/admin/hours")
    public ResponseEntity<List<RestaurantHours>> updateAllHours(@RequestBody List<RestaurantHours> hoursList) {
        List<RestaurantHours> updatedHours = restaurantHoursService.saveAllHours(hoursList);
        return ResponseEntity.ok(updatedHours);
    }

    @PutMapping("/api/admin/hours/{id}")
    public ResponseEntity<RestaurantHours> updateHours(@PathVariable Long id, @RequestBody RestaurantHours hours) {
        return restaurantHoursService.updateHours(id, hours)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
