package com.mikesgrill.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestaurantController {

    @GetMapping("/api/public/restaurant")
    public String getRestaurantInfo() {
        return "Welcome to Mike's Grill API";
    }
}