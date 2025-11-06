package com.mikesgrill.backend;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class SiteSettingsService {

    private final SiteSettingsRepository siteSettingsRepository;
    private final Path uploadsDirectory = Paths.get("uploads").toAbsolutePath().normalize();

    public SiteSettingsService(SiteSettingsRepository siteSettingsRepository) {
        this.siteSettingsRepository = siteSettingsRepository;
        try {
            Files.createDirectories(uploadsDirectory);
        } catch (IOException e) {
            throw new RuntimeException("Unable to create uploads directory", e);
        }
    }

    public SiteSettings getSettings() {
        return siteSettingsRepository.findAll()
                .stream()
                .findFirst()
                .orElseGet(this::createDefaultSettings);
    }

    public SiteSettings updateHeroImage(String heroImageUrl) {
        SiteSettings settings = getSettings();
        settings.setHeroImageUrl(heroImageUrl);
        return siteSettingsRepository.save(settings);
    }

    public SiteSettings updateHeroImageWithFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        String originalName = StringUtils.cleanPath(file.getOriginalFilename() != null ? file.getOriginalFilename() : "hero-image");
        String extension = "";
        int dotIndex = originalName.lastIndexOf('.');
        if (dotIndex >= 0) {
            extension = originalName.substring(dotIndex);
        }
        String filename = "hero-" + UUID.randomUUID() + extension;
        Path target = uploadsDirectory.resolve(filename);
        Files.copy(file.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);
        return updateHeroImage("/uploads/" + filename);
    }

    @PostConstruct
    public void ensureDefaultSettings() {
        if (siteSettingsRepository.count() == 0) {
            createDefaultSettings();
        }
    }

    private SiteSettings createDefaultSettings() {
        SiteSettings defaults = new SiteSettings(null);
        return siteSettingsRepository.save(defaults);
    }
}
