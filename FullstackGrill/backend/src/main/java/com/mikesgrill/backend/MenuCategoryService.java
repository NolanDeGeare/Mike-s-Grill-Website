package com.mikesgrill.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class MenuCategoryService {

    private final MenuCategoryRepository menuCategoryRepository;
    private final MenuItemRepository menuItemRepository;

    @Autowired
    public MenuCategoryService(MenuCategoryRepository menuCategoryRepository,
                               MenuItemRepository menuItemRepository) {
        this.menuCategoryRepository = menuCategoryRepository;
        this.menuItemRepository = menuItemRepository;
    }

    public List<MenuCategory> getAllCategories() {
        return menuCategoryRepository.findAllByOrderBySortOrderAsc();
    }

    public MenuCategory createCategory(MenuCategory category) {
        if (category.getName() == null || category.getName().isBlank()) {
            throw new IllegalArgumentException("Category name is required");
        }
        category.setName(category.getName().trim());
        if (category.getSortOrder() == null) {
            int nextOrder = menuCategoryRepository.findTopByOrderBySortOrderDesc()
                    .map(MenuCategory::getSortOrder)
                    .orElse(0) + 1;
            category.setSortOrder(nextOrder);
        }
        return menuCategoryRepository.save(category);
    }

    public Optional<MenuCategory> updateCategory(Long id, MenuCategory incoming) {
        return menuCategoryRepository.findById(id).map(existing -> {
            String oldName = existing.getName();
            if (incoming.getName() != null && !incoming.getName().isBlank()) {
                existing.setName(incoming.getName().trim());
            }
            if (incoming.getSortOrder() != null) {
                existing.setSortOrder(incoming.getSortOrder());
            }
            return menuCategoryRepository.save(existing);
        });
    }

    @PostConstruct
    public void ensureDefaultCategories() {
        if (menuCategoryRepository.count() == 0) {
            List<String> defaults = Arrays.asList(
                "Breakfast", "Drinks", "Desserts", "Sandwiches",
                "Extras", "Sides", "Dinner", "Kids", "Salads"
            );
            int order = 1;
            for (String name : defaults) {
                MenuCategory category = new MenuCategory(name, order++);
                menuCategoryRepository.save(category);
            }
        }
    }
}
