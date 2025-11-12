package com.example.alltogether.model;

import java.util.Arrays;

public enum Category {
    BAR,
    MUSEE,
    BOITE_DE_NUIT,
    PARC,
    BIBLIOTHEQUE,
    MONUMENT_HISTORIQUE;

    /**
     * Convertit un String en Category.
     * @param text Le texte à convertir.
     * @return L'élément Category correspondant.
     * @throws IllegalArgumentException Si le texte ne correspond à aucun élément de l'énumération.
     */
    public static Category fromString(String text) {
        if (text == null || text.trim().isEmpty()) {
            return null;
        }
        try {
            return Category.valueOf(text.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Catégorie non valide: " + text +
                    ". Valeurs acceptées: " + Arrays.toString(Category.values()));
        }
    }

    /**
     * Convertit un Category en String.
     * @return Le nom de l'élément Category en minuscules.
     */
    public String toStringValue() {
        return this.name().toLowerCase();
    }
}
