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
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/louvre_1.jpg' FROM place WHERE name = 'Musée du Louvre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/louvre_2.jpg' FROM place WHERE name = 'Musée du Louvre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/orsay_1.jpg' FROM place WHERE name = 'Musée d''Orsay';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/orsay_2.jpg' FROM place WHERE name = 'Musée d''Orsay';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/notre_dame_1.jpg' FROM place WHERE name = 'Cathédrale Notre-Dame de Paris';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/notre_dame_2.jpg' FROM place WHERE name = 'Cathédrale Notre-Dame de Paris';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/chaumont_1.jpg' FROM place WHERE name = 'Parc des Buttes-Chaumont';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/chaumont_2.jpg' FROM place WHERE name = 'Parc des Buttes-Chaumont';


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
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/confluence_1.jpg' FROM place WHERE name = 'Musée des Confluences';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/confluence_2.jpg' FROM place WHERE name = 'Musée des Confluences';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/beaux_arts_1.jpg' FROM place WHERE name = 'Musée des Beaux-Arts de Lyon';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/beaux_arts_2.jpg' FROM place WHERE name = 'Musée des Beaux-Arts de Lyon';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/fourvière_1.jpg' FROM place WHERE name = 'Basilique Notre-Dame de Fourvière';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/fourvière_2.jpg' FROM place WHERE name = 'Basilique Notre-Dame de Fourvière';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/gerland_1.jpg' FROM place WHERE name = 'Parc de Gerland';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/gerland_2.jpg' FROM place WHERE name = 'Parc de Gerland';
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
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mucem_1.jpg' FROM place WHERE name = 'MuCEM';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mucem_2.jpg' FROM place WHERE name = 'MuCEM';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/histoire_mars_1.jpg' FROM place WHERE name = 'Musée d''Histoire de Marseille';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/histoire_mars_2.jpg' FROM place WHERE name = 'Musée d''Histoire de Marseille';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/if_1.jpg' FROM place WHERE name = 'Château d''If';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/if_2.jpg' FROM place WHERE name = 'Château d''If';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/longchamp_1.jpg' FROM place WHERE name = 'Parc Longchamp';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/longchamp_2.jpg' FROM place WHERE name = 'Parc Longchamp';

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
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/augustins_1.jpg' FROM place WHERE name = 'Musée des Augustins';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/augustins_2.jpg' FROM place WHERE name = 'Musée des Augustins';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/raymond_1.jpg' FROM place WHERE name = 'Musée Saint-Raymond';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/raymond_2.jpg' FROM place WHERE name = 'Musée Saint-Raymond';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/capitole_1.jpg' FROM place WHERE name = 'Capitole de Toulouse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/capitole_2.jpg' FROM place WHERE name = 'Capitole de Toulouse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/prairie_1.jpg' FROM place WHERE name = 'Prairie des Filtres';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/prairie_2.jpg' FROM place WHERE name = 'Prairie des Filtres';
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
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/aquitaine_1.jpg' FROM place WHERE name = 'Musée d''Aquitaine';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/aquitaine_2.jpg' FROM place WHERE name = 'Musée d''Aquitaine';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/beaux_art_bord_1.jpg' FROM place WHERE name = 'Musée des Beaux-Arts de Bordeaux';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/beaux_art_bord_2.jpg' FROM place WHERE name = 'Musée des Beaux-Arts de Bordeaux';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/andre_1.jpg' FROM place WHERE name = 'Cathédrale Saint-André';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/andre_2.jpg' FROM place WHERE name = 'Cathédrale Saint-André';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bordelais_1.jpg' FROM place WHERE name = 'Parc Bordelais';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bordelais_2.jpg' FROM place WHERE name = 'Parc Bordelais';
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
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/capsule_2.jpg' FROM place WHERE name = 'La Capsule';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/pirogue_1.jpg' FROM place WHERE name = 'La Pirogue';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/pirogue_2.jpg' FROM place WHERE name = 'La Pirogue';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/network_1.jpg' FROM place WHERE name = 'Network Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/network_2.jpg' FROM place WHERE name = 'Network Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_citadelle_1.jpg' FROM place WHERE name = 'Parc de la Citadelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_citadelle_2.jpg' FROM place WHERE name = 'Parc de la Citadelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/media_jean_1.jpg' FROM place WHERE name = 'Médiathèque Jean-Lévy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/media_jean_2.jpg' FROM place WHERE name = 'Médiathèque Jean-Lévy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/beaux_arts_lille_1.jpg' FROM place WHERE name = 'Palais des Beaux-Arts de Lille';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/beaux_arts_lille_2.jpg' FROM place WHERE name = 'Palais des Beaux-Arts de Lille';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/piscine_1.jpg' FROM place WHERE name = 'La Piscine - Musée d''Art et d''Industrie (Roubaix)';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/piscine_2.jpg' FROM place WHERE name = 'La Piscine - Musée d''Art et d''Industrie (Roubaix)';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bourse_1.jpg' FROM place WHERE name = 'Vieille Bourse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bourse_2.jpg' FROM place WHERE name = 'Vieille Bourse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/lebas_1.jpg' FROM place WHERE name = 'Parc Jean-Baptiste Lebas';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/lebas_2.jpg' FROM place WHERE name = 'Parc Jean-Baptiste Lebas';


-- =====================================
-- NICE (city_id = 7)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/snug_1.jpg' FROM place WHERE name = 'Le Snug';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/snug_2.jpg' FROM place WHERE name = 'Le Snug';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/shapko_1.jpg' FROM place WHERE name = 'Le Shapko';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/shapko_2.jpg' FROM place WHERE name = 'Le Shapko';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/glam_1.jpg' FROM place WHERE name = 'Le Glam';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/glam_2.jpg' FROM place WHERE name = 'Le Glam';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/black_sheep_1.jpg' FROM place WHERE name = 'Le Black Sheep';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/black_sheep_2.jpg' FROM place WHERE name = 'Le Black Sheep';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/wayne_1.jpg' FROM place WHERE name = 'Le Wayne''s';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/wayne_2.jpg' FROM place WHERE name = 'Le Wayne''s';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/high_1.jpg' FROM place WHERE name = 'High Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/high_2.jpg' FROM place WHERE name = 'High Club';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_colinne_1.jpg' FROM place WHERE name = 'Parc de la Colline du Château';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_colinne_2.jpg' FROM place WHERE name = 'Parc de la Colline du Château';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_nucea_1.jpg' FROM place WHERE name = 'Bibliothèque Louis Nucéra';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_nucea_2.jpg' FROM place WHERE name = 'Bibliothèque Louis Nucéra';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_matisse_1.jpg' FROM place WHERE name = 'Musée Matisse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_matisse_2.jpg' FROM place WHERE name = 'Musée Matisse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mamac_1.jpg' FROM place WHERE name = 'MAMAC';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mamac_2.jpg' FROM place WHERE name = 'MAMAC';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/st_reparate_1.jpg' FROM place WHERE name = 'Cathédrale Sainte-Réparate';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/st_reparate_2.jpg' FROM place WHERE name = 'Cathédrale Sainte-Réparate';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/paillon_1.jpg' FROM place WHERE name = 'Promenade du Paillon';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/paillon_2.jpg' FROM place WHERE name = 'Promenade du Paillon';


-- =====================================
-- NANTES (city_id = 8)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_nid_1.jpg' FROM place WHERE name = 'Le Nid';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_nid_2.jpg' FROM place WHERE name = 'Le Nid';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_lieu_unique_1.jpg' FROM place WHERE name = 'Le Lieu Unique';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_lieu_unique_2.jpg' FROM place WHERE name = 'Le Lieu Unique';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mojito_1.jpg' FROM place WHERE name = 'Mojito Royal';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mojito_2.jpg' FROM place WHERE name = 'Mojito Royal';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_brick_1.jpg' FROM place WHERE name = 'Le Brick';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_brick_2.jpg' FROM place WHERE name = 'Le Brick';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_mccarthys_1.jpg' FROM place WHERE name = 'Le McCarthy''s';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_mccarthys_2.jpg' FROM place WHERE name = 'Le McCarthy''s';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_warehouse_1.jpg' FROM place WHERE name = 'Le Warehouse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_warehouse_2.jpg' FROM place WHERE name = 'Le Warehouse';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_plantes_nantes_1.jpg' FROM place WHERE name = 'Jardin des Plantes de Nantes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_plantes_nantes_2.jpg' FROM place WHERE name = 'Jardin des Plantes de Nantes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mediatheque_jacques_demy_1.jpg' FROM place WHERE name = 'Médiathèque Jacques Demy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mediatheque_jacques_demy_2.jpg' FROM place WHERE name = 'Médiathèque Jacques Demy';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_arts_nantes_1.jpg' FROM place WHERE name = 'Musée d''arts de Nantes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_arts_nantes_2.jpg' FROM place WHERE name = 'Musée d''arts de Nantes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_dobree_1.jpg' FROM place WHERE name = 'Musée Dobrée';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_dobree_2.jpg' FROM place WHERE name = 'Musée Dobrée';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/chateau_ducs_bretagne_1.jpg' FROM place WHERE name = 'Château des Ducs de Bretagne';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/chateau_ducs_bretagne_2.jpg' FROM place WHERE name = 'Château des Ducs de Bretagne';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_proce_1.jpg' FROM place WHERE name = 'Parc de Procé';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_proce_2.jpg' FROM place WHERE name = 'Parc de Procé';
-- =====================================
-- MONTPELLIER (city_id = 9)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/rockstore_1.jpg' FROM place WHERE name = 'Le Rockstore';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/rockstore_2.jpg' FROM place WHERE name = 'Le Rockstore';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/black_sheep_montpellier_1.jpg' FROM place WHERE name = 'Black Sheep ';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/black_sheep_montpellier_2.jpg' FROM place WHERE name = 'Black Sheep ';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bistrot_des_arts_1.jpg' FROM place WHERE name = 'Le Bistrot des Arts';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bistrot_des_arts_2.jpg' FROM place WHERE name = 'Le Bistrot des Arts';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/factory_1.jpg' FROM place WHERE name = 'Le Factory';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/factory_2.jpg' FROM place WHERE name = 'Le Factory';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/saint_roch_1.jpg' FROM place WHERE name = 'Le Saint-Roch';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/saint_roch_2.jpg' FROM place WHERE name = 'Le Saint-Roch';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/lantirouille_1.jpg' FROM place WHERE name = 'L''Antirouille';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/lantirouille_2.jpg' FROM place WHERE name = 'L''Antirouille';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_peyrou_1.jpg' FROM place WHERE name = 'Parc du Peyrou';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_peyrou_2.jpg' FROM place WHERE name = 'Parc du Peyrou';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mediatheque_emile_zola_1.jpg' FROM place WHERE name = 'Médiathèque Émile Zola';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mediatheque_emile_zola_2.jpg' FROM place WHERE name = 'Médiathèque Émile Zola';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_fabre_1.jpg' FROM place WHERE name = 'Musée Fabre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_fabre_2.jpg' FROM place WHERE name = 'Musée Fabre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_atger_1.jpg' FROM place WHERE name = 'Musée Atger';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_atger_2.jpg' FROM place WHERE name = 'Musée Atger';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cathedrale_saint_pierre_mtp_1.jpg' FROM place WHERE name = 'Cathédrale Saint-Pierre de Montpellier';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cathedrale_saint_pierre_mtp_2.jpg' FROM place WHERE name = 'Cathédrale Saint-Pierre de Montpellier';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_plantes_mtp_1.jpg' FROM place WHERE name = 'Jardin des Plantes de Montpellier';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/jardin_plantes_mtp_2.jpg' FROM place WHERE name = 'Jardin des Plantes de Montpellier';
-- =====================================
-- STRASBOURG (city_id = 10)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_grincheux_1.jpg' FROM place WHERE name = 'Le Grincheux';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_grincheux_2.jpg' FROM place WHERE name = 'Le Grincheux';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cafe_brant_1.jpg' FROM place WHERE name = 'Le Café Brant';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cafe_brant_2.jpg' FROM place WHERE name = 'Le Café Brant';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/code_bar_1.jpg' FROM place WHERE name = 'Code Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/code_bar_2.jpg' FROM place WHERE name = 'Code Bar';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/molodoi_1.jpg' FROM place WHERE name = 'Le Molodoï';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/molodoi_2.jpg' FROM place WHERE name = 'Le Molodoï';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/campus_cafe_1.jpg' FROM place WHERE name = 'Le Campus Café';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/campus_cafe_2.jpg' FROM place WHERE name = 'Le Campus Café';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/la_salamandre_1.jpg' FROM place WHERE name = 'La Salamandre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/la_salamandre_2.jpg' FROM place WHERE name = 'La Salamandre';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_orangerie_1.jpg' FROM place WHERE name = 'Parc de l''Orangerie';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_orangerie_2.jpg' FROM place WHERE name = 'Parc de l''Orangerie';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mediatheque_andre_malraux_1.jpg' FROM place WHERE name = 'Médiathèque André Malraux';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mediatheque_andre_malraux_2.jpg' FROM place WHERE name = 'Médiathèque André Malraux';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_alsacien_1.jpg' FROM place WHERE name = 'Musée Alsacien';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_alsacien_2.jpg' FROM place WHERE name = 'Musée Alsacien';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mamc_strasbourg_1.jpg' FROM place WHERE name = 'Musée d''Art Moderne et Contemporain de Strasbourg';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/mamc_strasbourg_2.jpg' FROM place WHERE name = 'Musée d''Art Moderne et Contemporain de Strasbourg';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cathedrale_strasbourg_1.jpg' FROM place WHERE name = 'Cathédrale Notre-Dame de Strasbourg';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cathedrale_strasbourg_2.jpg' FROM place WHERE name = 'Cathédrale Notre-Dame de Strasbourg';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_citadelle_strasbourg_1.jpg' FROM place WHERE name = 'Parc de la Citadelle';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_citadelle_strasbourg_2.jpg' FROM place WHERE name = 'Parc de la Citadelle';
-- =====================================
-- RENNES (city_id = 11)
-- =====================================
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_banjo_1.jpg' FROM place WHERE name = 'Le Banjo';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_banjo_2.jpg' FROM place WHERE name = 'Le Banjo';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bistrot_de_la_cite_1.jpg' FROM place WHERE name = 'Le Bistrot de la Cité';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/bistrot_de_la_cite_2.jpg' FROM place WHERE name = 'Le Bistrot de la Cité';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/pole_nord_1.jpg' FROM place WHERE name = 'Le Pôle Nord';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/pole_nord_2.jpg' FROM place WHERE name = 'Le Pôle Nord';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_domino_1.jpg' FROM place WHERE name = 'Le Domino';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_domino_2.jpg' FROM place WHERE name = 'Le Domino';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_stcyr_1.jpg' FROM place WHERE name = 'Le St-Cyr';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_stcyr_2.jpg' FROM place WHERE name = 'Le St-Cyr';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_pyms_1.jpg' FROM place WHERE name = 'Le Pym''s';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/le_pyms_2.jpg' FROM place WHERE name = 'Le Pym''s';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_thabor_1.jpg' FROM place WHERE name = 'Parc du Thabor';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_thabor_2.jpg' FROM place WHERE name = 'Parc du Thabor';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_champs_libres_1.jpg' FROM place WHERE name = 'Bibliothèque des Champs Libres';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/biblio_champs_libres_2.jpg' FROM place WHERE name = 'Bibliothèque des Champs Libres';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_de_bretagne_1.jpg' FROM place WHERE name = 'Musée de Bretagne';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_de_bretagne_2.jpg' FROM place WHERE name = 'Musée de Bretagne';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_beaux_arts_rennes_1.jpg' FROM place WHERE name = 'Musée des Beaux-Arts de Rennes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/musee_beaux_arts_rennes_2.jpg' FROM place WHERE name = 'Musée des Beaux-Arts de Rennes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cathedrale_saint_pierre_rennes_1.jpg' FROM place WHERE name = 'Cathédrale Saint-Pierre de Rennes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/cathedrale_saint_pierre_rennes_2.jpg' FROM place WHERE name = 'Cathédrale Saint-Pierre de Rennes';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_gayeulles_1.jpg' FROM place WHERE name = 'Parc des Gayeulles';
INSERT INTO place_photos (place_id, photo_url) SELECT id, '/uploads/places/parc_gayeulles_2.jpg' FROM place WHERE name = 'Parc des Gayeulles';


