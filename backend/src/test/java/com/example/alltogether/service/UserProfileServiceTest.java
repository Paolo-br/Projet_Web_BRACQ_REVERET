// UserProfileServiceTest.java
package com.example.alltogether.service;

import com.example.alltogether.dto.UserCreateDTO;
import com.example.alltogether.dto.UserProfileDTO;
import com.example.alltogether.dto.UserUpdateDTO;
import com.example.alltogether.exception.EmailAlreadyExistsException;
import com.example.alltogether.model.UserProfile;
import com.example.alltogether.repository.UserProfileRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserProfileServiceTest {

    @Mock
    private UserProfileRepository userProfileRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserProfileService userProfileService;

    private UserProfile user;
    private UserCreateDTO userCreateDTO;
    private UserUpdateDTO userUpdateDTO;

    @BeforeEach
    void setUp() {
        user = new UserProfile();
        user.setId(1L);
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john.doe@example.com");
        user.setYearOfBirth(1995);
        user.setCurrentCity("Paris");
        user.setCountryOrigin("France");

        userCreateDTO = new UserCreateDTO();
        userCreateDTO.setFirstName("John");
        userCreateDTO.setLastName("Doe");
        userCreateDTO.setEmail("john.doe@example.com");
        userCreateDTO.setPassword("password123");
        userCreateDTO.setYearOfBirth(1995);
        userCreateDTO.setCurrentCity("Paris");
        userCreateDTO.setCountryOrigin("France");

        userUpdateDTO = new UserUpdateDTO();
        userUpdateDTO.setFirstName("John");
        userUpdateDTO.setLastName("Smith");
        userUpdateDTO.setEmail("john.smith@example.com");
        userUpdateDTO.setYearOfBirth(1994);
        userUpdateDTO.setCurrentCity("Lyon");
        userUpdateDTO.setCountryOrigin("USA");
    }

    @Test
    void createUser_ShouldSuccess_WhenEmailIsUnique() {
        // Arrange
        when(userProfileRepository.existsByEmail("john.doe@example.com")).thenReturn(false);
        when(userProfileRepository.save(any(UserProfile.class))).thenReturn(user);

        // Act
        UserProfileDTO result = userProfileService.createUser(userCreateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("John", result.getFirstName());
        assertEquals("Doe", result.getLastName());
        assertEquals("john.doe@example.com", result.getEmail());
        verify(userProfileRepository, times(1)).save(any(UserProfile.class));
    }

    @Test
    void createUser_ShouldThrowException_WhenEmailAlreadyExists() {
        // Arrange
        when(userProfileRepository.existsByEmail("john.doe@example.com")).thenReturn(true);

        // Act & Assert
        EmailAlreadyExistsException exception = assertThrows(EmailAlreadyExistsException.class, () -> {
            userProfileService.createUser(userCreateDTO);
        });

        assertEquals("L'adresse email john.doe@example.com est déjà utilisée", exception.getMessage());
        verify(userProfileRepository, never()).save(any(UserProfile.class));
    }

    @Test
    void updateUser_ShouldSuccess_WhenUserExistsAndEmailIsUnique() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userProfileRepository.existsByEmailAndIdNot("john.smith@example.com", 1L)).thenReturn(false);
        when(userProfileRepository.save(any(UserProfile.class))).thenReturn(user);

        // Act
        Optional<UserProfileDTO> result = userProfileService.updateUser(1L, userUpdateDTO);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("Smith", result.get().getLastName());
        assertEquals("john.smith@example.com", result.get().getEmail());
        verify(userProfileRepository, times(1)).save(user);
    }

    @Test
    void updateUser_ShouldThrowException_WhenEmailAlreadyExists() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userProfileRepository.existsByEmailAndIdNot("john.smith@example.com", 1L)).thenReturn(true);

        // Act & Assert
        EmailAlreadyExistsException exception = assertThrows(EmailAlreadyExistsException.class, () -> {
            userProfileService.updateUser(1L, userUpdateDTO);
        });

        assertEquals("L'email john.smith@example.com est déjà utilisé par un autre utilisateur", exception.getMessage());
        verify(userProfileRepository, never()).save(any(UserProfile.class));
    }

    @Test
    void updateUser_ShouldReturnEmpty_WhenUserNotFound() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<UserProfileDTO> result = userProfileService.updateUser(1L, userUpdateDTO);

        // Assert
        assertFalse(result.isPresent());
        verify(userProfileRepository, never()).save(any(UserProfile.class));
    }

    @Test
    void getUserById_ShouldReturnUser_WhenUserExists() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.of(user));

        // Act
        Optional<UserProfileDTO> result = userProfileService.getUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals("John", result.get().getFirstName());
        assertEquals("Doe", result.get().getLastName());
    }

    @Test
    void getUserById_ShouldReturnEmpty_WhenUserNotFound() {
        // Arrange
        when(userProfileRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<UserProfileDTO> result = userProfileService.getUserById(1L);

        // Assert
        assertFalse(result.isPresent());
    }
}