package com.example.alltogether.service;

import com.example.alltogether.model.City;
import com.example.alltogether.model.Place;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.CityRepository;
import com.example.alltogether.repository.PlaceRepository;
import com.example.alltogether.repository.UserProfileRepository;
import com.example.alltogether.storage.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImageService {

    private final FileStorageService fileStorageService;
    private final UserProfileRepository userRepo;
    private final PlaceRepository placeRepo;
    private final CityRepository cityRepo;

    public ImageService(FileStorageService fileStorageService,
                        UserProfileRepository userRepo,
                        PlaceRepository placeRepo,
                        CityRepository cityRepo) {
        this.fileStorageService = fileStorageService;
        this.userRepo = userRepo;
        this.placeRepo = placeRepo;
        this.cityRepo = cityRepo;
    }

    // === USER ===
    public String uploadUserProfileImage(MultipartFile file, Long userId) {
        String url = fileStorageService.store(file);
        UserProfile user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setProfilePictureUrl(url);
        userRepo.save(user);
        return url;
    }

    public void deleteUserProfileImage(Long userId) {
        UserProfile user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        if (user.getProfilePictureUrl() != null) {
            fileStorageService.deleteFile(user.getProfilePictureUrl());
            user.setProfilePictureUrl(null);
            userRepo.save(user);
        }
    }

    // === PLACE ===
    public List<String> uploadPlacePhotos(List<MultipartFile> files, Long placeId) {
        Place place = placeRepo.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Lieu non trouvé"));
        List<String> urls = files.stream()
                .map(fileStorageService::store)
                .collect(Collectors.toList());
        place.getPhotos().addAll(urls);
        placeRepo.save(place);
        return urls;
    }

    public void deletePlacePhoto(Long placeId, String imageUrl) {
        Place place = placeRepo.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Lieu non trouvé"));
        place.getPhotos().remove(imageUrl);
        placeRepo.save(place);
        fileStorageService.deleteFile(imageUrl);
    }

    // === CITY ===
    public String uploadCityImage(MultipartFile file, Long cityId) {
        City city = cityRepo.findById(cityId)
                .orElseThrow(() -> new RuntimeException("Ville non trouvée"));
        String url = fileStorageService.store(file);
        city.setImageUrl(url);
        cityRepo.save(city);
        return url;
    }

    public void deleteCityImage(Long cityId) {
        City city = cityRepo.findById(cityId)
                .orElseThrow(() -> new RuntimeException("Ville non trouvée"));
        if (city.getImageUrl() != null) {
            fileStorageService.deleteFile(city.getImageUrl());
            city.setImageUrl(null);
            cityRepo.save(city);
        }
    }
}
