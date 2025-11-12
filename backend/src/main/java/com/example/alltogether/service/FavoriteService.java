package com.example.alltogether.service;

import com.example.alltogether.model.Favorite;
import com.example.alltogether.model.Place;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.FavoriteRepository;
import com.example.alltogether.repository.PlaceRepository;
import com.example.alltogether.repository.UserProfileRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FavoriteService {
    private final FavoriteRepository favoriteRepository;
    private final UserProfileRepository userProfileRepository;
    private final PlaceRepository placeRepository;

    public FavoriteService(FavoriteRepository favoriteRepository,
                           UserProfileRepository userProfileRepository,
                           PlaceRepository placeRepository) {
        this.favoriteRepository = favoriteRepository;
        this.userProfileRepository = userProfileRepository;
        this.placeRepository = placeRepository;
    }

    public List<Place> getFavoritesForUser(Long userId) {
        return favoriteRepository.findByUserId(userId).stream()
                .map(Favorite::getPlace)
                .collect(Collectors.toList());
    }

    public void addFavorite(Long userId, Long placeId) {
        if (favoriteRepository.existsByUserIdAndPlaceId(userId, placeId)) return; // idempotent

        UserProfile user = userProfileRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));
        Place place = placeRepository.findById(placeId)
                .orElseThrow(() -> new RuntimeException("Lieu introuvable"));

        Favorite fav = new Favorite(user, place);
        favoriteRepository.save(fav);
    }

    @Transactional
    public void removeFavorite(Long userId, Long placeId) {
        favoriteRepository.deleteByUserIdAndPlaceId(userId, placeId);
    }

    public boolean isFavorite(Long userId, Long placeId) {
        return favoriteRepository.existsByUserIdAndPlaceId(userId, placeId);
    }
}
