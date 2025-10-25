-- =====================================
-- FICHIER 2 : PHOTOS DES LIEUX
-- =====================================
-- Ce fichier gère UNIQUEMENT les photos des lieux
-- Pour ajouter de nouvelles photos, il suffit de modifier ce fichier
--
-- IMPORTANT : Ce fichier utilise DELETE puis INSERT pour permettre
-- des modifications faciles sans conflit avec ON CONFLICT

-- =====================================
-- NETTOYAGE : Supprimer toutes les photos existantes
-- =====================================
-- Cela permet de réexécuter ce script sans erreurs
TRUNCATE TABLE place_photos CASCADE;

-- =====================================
-- PARIS (city_id = 1)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/syndicat_1.jpg' FROM place WHERE name = 'Le Syndicat';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/syndicat_2.jpg' FROM place WHERE name = 'Le Syndicat';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/littlered_1.jpg' FROM place WHERE name = 'Little Red Door';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/littlered_2.jpg' FROM place WHERE name = 'Little Red Door';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/harry_1.jpg' FROM place WHERE name = 'Harry''s New York Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/harry_2.jpg' FROM place WHERE name = 'Harry''s New York Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/candelaria_1.jpg' FROM place WHERE name = 'La Candelaria';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/candelaria_2.jpg' FROM place WHERE name = 'La Candelaria';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/comptoir_1.jpg' FROM place WHERE name = 'Le Comptoir Général';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/comptoir_2.jpg' FROM place WHERE name = 'Le Comptoir Général';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/rex_1.jpg' FROM place WHERE name = 'Rex Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/rex_2.jpg' FROM place WHERE name = 'Rex Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/luxembourg_1.jpg' FROM place WHERE name = 'Jardin du Luxembourg';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/luxembourg_2.jpg' FROM place WHERE name = 'Jardin du Luxembourg';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/genevieve_1.jpg' FROM place WHERE name = 'Bibliothèque Sainte-Geneviève';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/genevieve_2.jpg' FROM place WHERE name = 'Bibliothèque Sainte-Geneviève';

-- =====================================
-- LYON (city_id = 2)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/sucre_1.jpg' FROM place WHERE name = 'Le Sucre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/sucre_2.jpg' FROM place WHERE name = 'Le Sucre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/ninkasi_1.jpg' FROM place WHERE name = 'Ninkasi Gerland';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/ninkasi_2.jpg' FROM place WHERE name = 'Ninkasi Gerland';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/soda_1.jpg' FROM place WHERE name = 'Soda Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/soda_2.jpg' FROM place WHERE name = 'Soda Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/faute_1.jpg' FROM place WHERE name = 'La Faute aux Ours';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/faute_2.jpg' FROM place WHERE name = 'La Faute aux Ours';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/alibi_1.jpg' FROM place WHERE name = 'L''Alibi';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/alibi_2.jpg' FROM place WHERE name = 'L''Alibi';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/salon_1.jpg' FROM place WHERE name = 'Le Petit Salon';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/salon_2.jpg' FROM place WHERE name = 'Le Petit Salon';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/tete_1.jpg' FROM place WHERE name = 'Parc de la Tête d''Or';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/tete_2.jpg' FROM place WHERE name = 'Parc de la Tête d''Or';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_part_1.jpg' FROM place WHERE name = 'Bibliothèque de la Part-Dieu';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_part_2.jpg' FROM place WHERE name = 'Bibliothèque de la Part-Dieu';

-- =====================================
-- MARSEILLE (city_id = 3)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/caravelle_1.jpg' FROM place WHERE name = 'La Caravelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/caravelle_2.jpg' FROM place WHERE name = 'La Caravelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/carrynation_1.jpg' FROM place WHERE name = 'Carry Nation';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/carrynation_2.jpg' FROM place WHERE name = 'Carry Nation';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bar_marine_1.jpg' FROM place WHERE name = 'Le Bar de la Marine';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bar_marine_2.jpg' FROM place WHERE name = 'Le Bar de la Marine';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/shamrock_1.jpg' FROM place WHERE name = 'Le Shamrock';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/shamrock_2.jpg' FROM place WHERE name = 'Le Shamrock';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/molotov_1.jpg' FROM place WHERE name = 'Le Molotov';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/molotov_2.jpg' FROM place WHERE name = 'Le Molotov';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/babyclub_1.jpg' FROM place WHERE name = 'Le Baby Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/babyclub_2.jpg' FROM place WHERE name = 'Le Baby Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/borely_1.jpg' FROM place WHERE name = 'Parc Borély';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/borely_2.jpg' FROM place WHERE name = 'Parc Borély';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/alcazar_1.jpg' FROM place WHERE name = 'Alcazar BMVR';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/alcazar_2.jpg' FROM place WHERE name = 'Alcazar BMVR';

-- =====================================
-- TOULOUSE (city_id = 4)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/saint_seins_1.jpg' FROM place WHERE name = 'Le Saint des Seins';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/saint_seins_2.jpg' FROM place WHERE name = 'Le Saint des Seins';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/murphy_1.jpg' FROM place WHERE name = 'Le Murphy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/murphy_2.jpg' FROM place WHERE name = 'Le Murphy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/connexion_1.jpg' FROM place WHERE name = 'Le Connexion';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/connexion_2.jpg' FROM place WHERE name = 'Le Connexion';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/daron_1.jpg' FROM place WHERE name = 'Le Daron';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/daron_2.jpg' FROM place WHERE name = 'Le Daron';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_comptoir_1.jpg' FROM place WHERE name = 'Le Comptoir du Capitole';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_comptoir_2.jpg' FROM place WHERE name = 'Le Comptoir du Capitole';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/envol_1.jpg' FROM place WHERE name = 'L''Envol Côté Plage';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/envol_2.jpg' FROM place WHERE name = 'L''Envol Côté Plage';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_plantes_1.jpg' FROM place WHERE name = 'Jardin des Plantes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_plantes_2.jpg' FROM place WHERE name = 'Jardin des Plantes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_etu_1.jpg' FROM place WHERE name = 'Bibliothèque d''Étude et du Patrimoine';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_etu_2.jpg' FROM place WHERE name = 'Bibliothèque d''Étude et du Patrimoine';

-- =====================================
-- BORDEAUX (city_id = 5)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/house_parliament_1.jpg' FROM place WHERE name = 'The House of Parliament';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/house_parliament_2.jpg' FROM place WHERE name = 'The House of Parliament';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cafe_brun_1.jpg' FROM place WHERE name = 'Café Brun';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cafe_brun_2.jpg' FROM place WHERE name = 'Café Brun';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/lucifer_1.jpg' FROM place WHERE name = 'Le Lucifer';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/lucifer_2.jpg' FROM place WHERE name = 'Le Lucifer';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/sherlock_1.jpg' FROM place WHERE name = 'Le Sherlock Holmes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/sherlock_2.jpg' FROM place WHERE name = 'Le Sherlock Holmes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/comtesse_1.jpg' FROM place WHERE name = 'La Comtesse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/comtesse_2.jpg' FROM place WHERE name = 'La Comtesse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/theatro_1.jpg' FROM place WHERE name = 'Le Theatro';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/theatro_2.jpg' FROM place WHERE name = 'Le Theatro';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_public_1.jpg' FROM place WHERE name = 'Jardin Public';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_public_2.jpg' FROM place WHERE name = 'Jardin Public';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_meria_1.jpg' FROM place WHERE name = 'Bibliothèque Mériadeck';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_meria_2.jpg' FROM place WHERE name = 'Bibliothèque Mériadeck';
-- =====================================
-- LILLE (city_id = 6)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/dandy_1.jpg' FROM place WHERE name = 'Le Dandy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/dandy_2.jpg' FROM place WHERE name = 'Le Dandy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/kremlin_1.jpg' FROM place WHERE name = 'Le Kremlin';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/kremlin_2.jpg' FROM place WHERE name = 'Le Kremlin';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/tripostal_1.jpg' FROM place WHERE name = 'Le Tripostal Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/tripostal_2.jpg' FROM place WHERE name = 'Le Tripostal Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/capsule_1.jpg' FROM place WHERE name = 'La Capsule';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/capsule_1.jpg' FROM place WHERE name = 'La Capsule';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/pirogue_1.jpg' FROM place WHERE name = 'La Pirogue';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/pirogue_1.jpg' FROM place WHERE name = 'La Pirogue';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/network_1.jpg' FROM place WHERE name = 'Network Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/network_2.jpg' FROM place WHERE name = 'Network Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_citadelle_1.jpg' FROM place WHERE name = 'Parc de la Citadelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_citadelle_2.jpg' FROM place WHERE name = 'Parc de la Citadelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/media_jean_1.jpg' FROM place WHERE name = 'Médiathèque Jean-Lévy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/media_jean_2.jpg' FROM place WHERE name = 'Médiathèque Jean-Lévy';

-- =====================================
-- NICE (city_id = 7)
-- =====================================
-- TODO: Ajouter les photos de Nice

-- =====================================
-- NANTES (city_id = 8)
-- =====================================
-- TODO: Ajouter les photos de Nantes

-- =====================================
-- MONTPELLIER (city_id = 9)
-- =====================================
-- TODO: Ajouter les photos de Montpellier

-- =====================================
-- STRASBOURG (city_id = 10)
-- =====================================
-- TODO: Ajouter les photos de Strasbourg

-- =====================================
-- RENNES (city_id = 11)
-- =====================================
-- TODO: Ajouter les photos de Rennes

-- =====================================
-- VÉRIFICATION FINALE
-- =====================================
-- Affiche le nombre de photos par ville
SELECT 
    c.name as ville, 
    COUNT(DISTINCT p.id) as nb_lieux, 
    COUNT(pp.photo_url) as nb_photos,
    ROUND(COUNT(pp.photo_url)::numeric / NULLIF(COUNT(DISTINCT p.id), 0), 1) as photos_par_lieu
FROM city c
LEFT JOIN place p ON c.id = p.city_id
LEFT JOIN place_photos pp ON p.id = pp.place_id
GROUP BY c.id, c.name
ORDER BY c.id;
