package com.mikesgrill.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MenuItemService {

    @Autowired
    private MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public List<MenuItem> getMenuItemsByCategoryId(Long categoryId) {
        return menuItemRepository.findByCategoryId(categoryId);
    }

    public List<MenuItem> getFeaturedMenuItems() {
        return menuItemRepository.findByFeatured(true);
    }

    public Optional<MenuItem> getMenuItemById(Long id) {
        return menuItemRepository.findById(id);
    }

    public MenuItem saveMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public MenuItem addMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public Optional<MenuItem> updateMenuItem(Long id, MenuItem newItem) {
        return menuItemRepository.findById(id)
                .map(existingItem -> {
                    existingItem.setName(newItem.getName());
                    existingItem.setDescription(newItem.getDescription());
                    existingItem.setPrice(newItem.getPrice());
                    existingItem.setImageUrl(newItem.getImageUrl());
                    existingItem.setCategory(newItem.getCategory());
                    existingItem.setFeatured(newItem.isFeatured());
                    return menuItemRepository.save(existingItem);
                });
    }

    public boolean deleteMenuItem(Long id) {
        if (menuItemRepository.existsById(id)) {
            menuItemRepository.deleteById(id);
            return true;
        }
        return false;
    }
}