package com.mikesgrill.backend;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class SiteSettingsController {

    private final SiteSettingsService siteSettingsService;

    public SiteSettingsController(SiteSettingsService siteSettingsService) {
        this.siteSettingsService = siteSettingsService;
    }

    @GetMapping("/api/public/settings")
    public SiteSettings getPublicSettings() {
        return siteSettingsService.getSettings();
    }

    @GetMapping("/api/admin/settings")
    public SiteSettings getAdminSettings() {
        return siteSettingsService.getSettings();
    }

    @PutMapping("/api/admin/settings/hero-image")
    public ResponseEntity<SiteSettings> updateHeroImage(@RequestBody SiteSettings request) {
        String heroUrl = request.getHeroImageUrl();
        if (heroUrl != null && heroUrl.isBlank()) {
            heroUrl = null;
        }
        SiteSettings updated = siteSettingsService.updateHeroImage(heroUrl);
        return ResponseEntity.ok(updated);
    }

    @PostMapping("/api/admin/settings/hero-image/upload")
    public ResponseEntity<SiteSettings> uploadHeroImage(@RequestParam("file") MultipartFile file) {
        try {
            SiteSettings updated = siteSettingsService.updateHeroImageWithFile(file);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
