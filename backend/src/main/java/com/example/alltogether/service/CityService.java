package com.example.alltogether.service;

import com.example.alltogether.dto.CityDTO;
import com.example.alltogether.model.City;
import com.example.alltogether.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service de gestion des villes.
 *
 * Gère la logique métier pour :
 * - Récupérer, créer, modifier et supprimer des villes
 * - Rechercher des villes par nom
 * - Convertir entre entités et DTOs
 */
@Service
public class CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    /**
     * Récupère toutes les villes sous forme de DTOs.
     */
    public List<CityDTO> getAllCities() {
        return cityRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Récupère une ville par son ID.
     */
    public Optional<CityDTO> getCityById(Long id) {
        return cityRepository.findById(id)
                .map(this::toDTO);
    }

    /**
     * Récupère une ville par son nom exact (insensible à la casse).
     */
    public Optional<CityDTO> getCityByName(String name) {
        return cityRepository.findByNameIgnoreCase(name)
                .map(this::toDTO);
    }

    /**
     * Recherche des villes dont le nom contient la chaîne fournie.
     */
    public List<CityDTO> searchCitiesByName(String name) {
        return cityRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    /**
     * Crée une nouvelle ville à partir d'un DTO.
     */
    public CityDTO createCity(CityDTO cityDTO) {
        City city = toEntity(cityDTO);
        City saved = cityRepository.save(city);
        return toDTO(saved);
    }

    /**
     * Met à jour les informations d'une ville existante.
     */
    public Optional<CityDTO> updateCity(Long id, CityDTO cityDTO) {
        return cityRepository.findById(id)
                .map(city -> {
                    city.setName(cityDTO.getName());
                    city.setDescription(cityDTO.getDescription());
                    city.setLatitude(cityDTO.getLatitude());
                    city.setLongitude(cityDTO.getLongitude());
                    city.setImageUrl(cityDTO.getImageUrl());
                    City updated = cityRepository.save(city);
                    return toDTO(updated);
                });
    }

    /**
     * Supprime une ville par son ID.
     */
    public void deleteCity(Long id) {
        cityRepository.deleteById(id);
    }

    /**
     * Convertit un CityDTO en entité City.
     */
    private City toEntity(CityDTO dto) {
        City city = new City();
        city.setName(dto.getName());
        city.setDescription(dto.getDescription());
        city.setLatitude(dto.getLatitude());
        city.setLongitude(dto.getLongitude());
        city.setImageUrl(dto.getImageUrl());
        return city;
    }

    /**
     * Convertit une entité City en CityDTO.
     */
    public CityDTO toDTO(City city) {
        return new CityDTO(city.getId(), city.getName(), city.getDescription(), city.getLatitude(), city.getLongitude(), city.getImageUrl());
    }
}
