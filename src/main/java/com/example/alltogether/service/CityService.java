package com.example.alltogether.service;

import com.example.alltogether.dto.CityDTO;
import com.example.alltogether.model.City;
import com.example.alltogether.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CityService {

    private final CityRepository cityRepository;

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    // GET: Retourne une liste de CityDTO
    public List<CityDTO> getAllCities() {
        return cityRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // GET: Retourne un Optional<CityDTO>
    public Optional<CityDTO> getCityById(Long id) {
        return cityRepository.findById(id)
                .map(this::toDTO);
    }

    // GET: Recherche par nom (retourne une liste de CityDTO)
    public List<CityDTO> searchCitiesByName(String name) {
        return cityRepository.findByNameContainingIgnoreCase(name).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // POST: Crée une City à partir d'un CityDTO
    public CityDTO createCity(CityDTO cityDTO) {
        City city = toEntity(cityDTO);
        City saved = cityRepository.save(city);
        return toDTO(saved);
    }

    // PUT: Met à jour une City à partir d'un CityDTO
    public Optional<CityDTO> updateCity(Long id, CityDTO cityDTO) {
        return cityRepository.findById(id)
                .map(city -> {
                    city.setName(cityDTO.getName());
                    city.setLatitude(cityDTO.getLatitude());
                    city.setLongitude(cityDTO.getLongitude());
                    city.setImageUrl(cityDTO.getImageUrl());
                    City updated = cityRepository.save(city);
                    return toDTO(updated);
                });
    }

    // DELETE: Supprime une City
    public void deleteCity(Long id) {
        cityRepository.deleteById(id);
    }

    // Conversion DTO → Entity
    private City toEntity(CityDTO dto) {
        City city = new City();
        city.setName(dto.getName());
        city.setLatitude(dto.getLatitude());
        city.setLongitude(dto.getLongitude());
        city.setImageUrl(dto.getImageUrl());
        return city;
    }

    // Conversion Entity → DTO
    public CityDTO toDTO(City city) {
        return new CityDTO(city.getId(), city.getName(), city.getLatitude(), city.getLongitude(), city.getImageUrl());
    }
}
