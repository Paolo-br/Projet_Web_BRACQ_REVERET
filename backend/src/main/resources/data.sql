-- =====================================
-- CITIES (à insérer en premier)
-- =====================================
INSERT INTO city (id, name, description, latitude, longitude, image_url) VALUES
(1, 'Paris', 'La ville lumière, capitale de la culture et de la gastronomie française', 48.8566, 2.3522, '/uploads/city/paris.jpg'),
(2, 'Lyon', 'Capitale de la gastronomie française, riche en histoire et culture', 45.7640, 4.8357, '/uploads/city/lyon.jpg'),
(3, 'Marseille', 'Ville portuaire dynamique au bord de la Méditerranée', 43.2965, 5.3698, '/uploads/city/marseille.jpeg'),
(4, 'Toulouse', 'La ville rose, centre de l''aéronautique et de la recherche', 43.6047, 1.4442, '/uploads/city/toulouse.jpg'),
(5, 'Bordeaux', 'Capitale mondiale du vin, ville d''art et d''histoire', 44.8378, -0.5792, '/uploads/city/bordeaux.jpg'),
(6, 'Lille', 'Ville dynamique du Nord, centre culturel et étudiant', 50.6292, 3.0573, '/uploads/city/lille.jpg'),
(7, 'Nice', 'Perle de la Côte d''Azur, entre mer et montagnes', 43.7102, 7.2620, '/uploads/city/nice.jpg'),
(8, 'Nantes', 'Ville créative et innovante de l''Ouest', 47.2184, -1.5536, '/uploads/city/nantes.jpeg'),
(10, 'Strasbourg', 'Capitale européenne, entre France et Allemagne', 48.5734, 7.7521, '/uploads/city/strasbourg.jpg'),
(9, 'Montpellier', 'Ville étudiante ensoleillée du Sud', 43.6108, 3.8767, '/uploads/city/montpellier.jpg'),
(11, 'Rennes', 'Capitale bretonne, ville jeune et dynamique', 48.1173, -1.6778, '/uploads/city/rennes.jpg')
ON CONFLICT (id) DO NOTHING;

-- Réinitialiser la séquence pour l'auto-increment
SELECT setval('city_id_seq', (SELECT MAX(id) FROM city));

-- =====================================
-- PLACES
-- =====================================
ALTER TABLE place DROP CONSTRAINT IF EXISTS unique_place_name;
ALTER TABLE place ADD CONSTRAINT unique_place_name UNIQUE(name);


-- Paris
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Syndicat', 'BAR', '51 Rue du Faubourg Saint-Denis', 'Bar à cocktails créatif', NULL, 48.8721, 2.3540, 1),
                                                                                                          ('Little Red Door', 'BAR', '60 Rue Charlot', 'Bar intimiste réputé', NULL, 48.8626, 2.3631, 1),
                                                                                                          ('Harry’s New York Bar', 'BAR', '5 Rue Daunou', 'Bar historique de Paris', NULL, 48.8696, 2.3322, 1),
                                                                                                          ('La Candelaria', 'BAR', '52 Rue de Saintonge', 'Bar caché derrière une taqueria', NULL, 48.8628, 2.3626, 1),
                                                                                                          ('Le Comptoir Général', 'BAR', '80 Quai de Jemmapes', 'Lieu atypique ambiance africaine', NULL, 48.8727, 2.3643, 1),
                                                                                                          ('Rex Club', 'BOITE_DE_NUIT', '5 Boulevard Poissonnière', 'Club électro emblématique de Paris', NULL,48.8714, 2.3470, 1),
                                                                                                          ('Jardin du Luxembourg', 'PARC', 'Rue de Médicis', 'Grand parc emblématique du 6e arrondissement', NULL,48.8462, 2.3371, 1),
                                                                                                          ('Bibliothèque Sainte-Geneviève', 'BIBLIOTHEQUE', '10 Place du Panthéon', 'Bibliothèque universitaire historique', NULL, 48.8467, 2.3471, 1)
    ON CONFLICT (name) DO NOTHING;

-- Lyon
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Sucre', 'BAR', '50 Quai Rambaud', 'Bar rooftop sur la Confluence', NULL, 45.7366, 4.8156, 2),
                                                                                                          ('Ninkasi Gerland', 'BAR', '267 Rue Marcel Mérieux', 'Temple des bières artisanales', NULL, 45.7331, 4.8271, 2),
                                                                                                          ('Soda Bar', 'BAR', '7 Rue de la Martinière', 'Bar à cocktails animé', NULL, 45.7690, 4.8273, 2),
                                                                                                          ('La Faute aux Ours', 'BAR', '4 Rue de la Barre', 'Bar étudiant convivial', NULL, 45.7578, 4.8353, 2),
                                                                                                          ('L’Alibi', 'BAR', '19 Rue du Palais Grillet', 'Cocktails & musique', NULL, 45.7617, 4.8351, 2),
                                                                                                          ('Le Petit Salon', 'BOITE_DE_NUIT', '3 Rue Cronstadt', 'Club réputé pour sa programmation électro', NULL,45.7455, 4.8378, 2),
                                                                                                          ('Parc de la Tête d’Or', 'PARC', 'Boulevard des Belges', 'Plus grand parc urbain de France', NULL,45.7763, 4.8519, 2),
                                                                                                          ('Bibliothèque de la Part-Dieu', 'BIBLIOTHEQUE', '30 Boulevard Marius Vivier Merle', 'Grande bibliothèque municipale de Lyon', NULL,45.7605, 4.8592, 2)
    ON CONFLICT (name) DO NOTHING;

-- Marseille
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('La Caravelle', 'BAR', '34 Quai du Port', 'Bar avec vue sur le Vieux-Port', NULL, 43.2951, 5.3745, 3),
                                                                                                          ('Carry Nation', 'BAR', 'Adresse secrète sur réservation', 'Speakeasy caché', NULL, 43.2965, 5.3698, 3),
                                                                                                          ('Le Bar de la Marine', 'BAR', 'Quai de Rive Neuve', 'Bar classique marseillais', NULL, 43.2938, 5.3676, 3),
                                                                                                          ('Le Shamrock', 'BAR', '13 Quai de Rive Neuve', 'Pub irlandais', NULL, 43.2935, 5.3671, 3),
                                                                                                          ('Le Molotov', 'BAR', '3 Place Paul Cézanne', 'Bar-concert alternatif', NULL, 43.2960, 5.3833, 3),
                                                                                                          ('Le Baby Club', 'BOITE_DE_NUIT', '2 Rue André Poggioli', 'Club techno underground de Marseille',NULL, 43.2966, 5.3813, 3),
                                                                                                          ('Parc Borély', 'PARC', 'Avenue du Prado', 'Parc emblématique de Marseille', NULL,43.2629, 5.3852, 3),
                                                                                                          ('Alcazar BMVR', 'BIBLIOTHEQUE', '58 Cours Belsunce', 'Bibliothèque municipale à vocation régionale', NULL,43.2981, 5.3784, 3)
    ON CONFLICT (name) DO NOTHING;

-- Bordeaux
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('The House of Parliament', 'BAR', '22 Cours Alsace-Lorraine', 'Pub anglais convivial', NULL, 44.8372, -0.5736, 5),
                                                                                                          ('Café Brun', 'BAR', '45 Rue Saint-Rémi', 'Bar étudiant historique', NULL, 44.8413, -0.5737, 5),
                                                                                                          ('Le Lucifer', 'BAR', '35 Rue de Pessac', 'Bar rock culte', NULL, 44.8320, -0.5813, 5),
                                                                                                          ('Le Sherlock Holmes', 'BAR', '16 Cours de l’Intendance', 'Ambiance britannique', NULL, 44.8419, -0.5766, 5),
                                                                                                          ('La Comtesse', 'BAR', '25 Rue Parlement Sainte-Catherine', 'Cocktails raffinés', NULL, 44.8387, -0.5721, 5),
                                                                                                          ('Le Theatro', 'BOITE_DE_NUIT', '72 Rue du Loup', 'Club branché du centre-ville', NULL,44.8392, -0.5735, 5),
                                                                                                          ('Jardin Public', 'PARC', 'Cours de Verdun', 'Parc historique en plein cœur de Bordeaux', NULL,44.8491, -0.5775, 5),
                                                                                                          ('Bibliothèque Mériadeck', 'BIBLIOTHEQUE', '85 Cours du Maréchal Juin', 'Grande bibliothèque municipale', NULL,44.8385, -0.5852, 5)
    ON CONFLICT (name) DO NOTHING;

-- Lille
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Dandy', 'BAR', '67 Rue Basse', 'Bar à cocktails élégant', NULL, 50.6422, 3.0621, 6),
                                                                                                          ('Le Kremlin', 'BAR', '51 Rue Jean-Jacques Rousseau', 'Bar à vodka original', NULL, 50.6359, 3.0628, 6),
                                                                                                          ('Le Tripostal Bar', 'BAR', 'Avenue Willy Brandt', 'Lieu culturel et bar', NULL, 50.6376, 3.0751, 6),
                                                                                                          ('La Capsule', 'BAR', '25 Rue des Trois Mollettes', 'Spécialité bières artisanales', NULL, 50.6419, 3.0634, 6),
                                                                                                          ('La Pirogue', 'BAR', '59 Rue de Gand', 'Cocktails exotiques', NULL,50.6416, 3.0655, 6),
                                                                                                          ('Network Club', 'BOITE_DE_NUIT', '15 Rue du Faisan', 'Club électro au cœur du Vieux-Lille', NULL,50.6374, 3.0637, 6),
                                                                                                          ('Parc de la Citadelle', 'PARC', 'Avenue Mathias Delobel', 'Grand espace vert autour de la Citadelle', NULL,50.6408, 3.0436, 6),
                                                                                                          ('Médiathèque Jean-Lévy', 'BIBLIOTHEQUE', '32-34 Rue Édouard Delesalle', 'Bibliothèque municipale centrale', NULL,50.6339, 3.0654, 6)
    ON CONFLICT (name) DO NOTHING;

-- Toulouse
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Saint des Seins', 'BAR', '10 Rue Gabriel Péri', 'Bar étudiant convivial', NULL, 43.6040, 1.4445, 4),
                                                                                                          ('Le Murphy', 'BAR', '5 Rue Gabriel Péri', 'Bar avec ambiance étudiante', NULL, 43.6038, 1.4425, 4),
                                                                                                          ('Le Connexion', 'BAR', '20 Rue des Lois', 'Bar étudiant avec concerts', NULL, 43.6032, 1.4450, 4),
                                                                                                          ('Le Daron', 'BAR', '12 Rue Saint-Rome', 'Bar étudiant sympa', NULL, 43.6015, 1.4420, 4),
                                                                                                          ('Le Comptoir du Capitole', 'BAR', '4 Place du Capitole', 'Bar étudiant central', NULL, 43.6045, 1.4442, 4),
                                                                                                          ('L’Envol Côté Plage', 'BOITE_DE_NUIT', 'Avenue Jean Gonord', 'Boîte de nuit en plein air très populaire', NULL,43.6115, 1.4810, 4),
                                                                                                          ('Jardin des Plantes', 'PARC', '31 Allée Jules Guesde', 'Grand parc historique du centre-ville', NULL,43.5925, 1.4455, 4),
                                                                                                          ('Bibliothèque d’Étude et du Patrimoine', 'BIBLIOTHEQUE', '1 Rue de Périgord', 'Bibliothèque municipale de Toulouse',NULL, 43.6045, 1.4460, 4)
    ON CONFLICT (name) DO NOTHING;

-- Nice
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Snug', 'BAR', '2 Rue de la Préfecture', 'Bar étudiant avec bonne ambiance', NULL, 43.6978, 7.2716, 7),
                                                                                                          ('Le Shapko', 'BAR', '9 Rue Rossetti', 'Bar étudiant avec musique live', NULL, 43.6960, 7.2722, 7),
                                                                                                          ('Le Glam', 'BAR', '15 Rue Defly', 'Bar étudiant convivial', NULL, 43.6951, 7.2735, 7),
                                                                                                          ('Le Black Sheep', 'BAR', '20 Rue Barillerie', 'Bar étudiant animé', NULL, 43.6958, 7.2730, 7),
                                                                                                          ('Le Wayne’s', 'BAR', '6 Rue Masséna', 'Bar étudiant populaire', NULL, 43.6970, 7.2738, 7),
                                                                                                          ('High Club', 'BOITE_DE_NUIT', '45 Promenade des Anglais', 'Boîte de nuit emblématique sur la Promenade', NULL,43.6950, 7.2595, 7),
                                                                                                          ('Parc de la Colline du Château', 'PARC', 'Rue des Ponchettes', 'Parc avec vue panoramique sur la baie', NULL,43.6944, 7.2798, 7),
                                                                                                          ('Bibliothèque Louis Nucéra', 'BIBLIOTHEQUE', '2 Place Yves Klein', 'Grande bibliothèque municipale moderne', NULL,43.7045, 7.2800, 7)

    ON CONFLICT (name) DO NOTHING;

-- Nantes
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Nid', 'BAR', '1 Place Graslin', 'Bar étudiant avec vue', NULL, 47.2120, -1.5540, 8),
                                                                                                          ('Le Lieu Unique', 'BAR', '2 Quai Ferdinand Favre', 'Bar étudiant culturel', NULL, 47.2125, -1.5560, 8),
                                                                                                          ('Le Clémenceau', 'BAR', '5 Rue de Strasbourg', 'Bar étudiant central', NULL, 47.2150, -1.5505, 8),
                                                                                                          ('Le Brick', 'BAR', '10 Rue Kervegan', 'Bar étudiant convivial', NULL, 47.2180, -1.5562, 8),
                                                                                                          ('Le McCarthy’s', 'BAR', '8 Rue de la Fosse', 'Pub/bar étudiant', NULL, 47.2185, -1.5535, 8),
                                                                                                          ('Le Warehouse', 'BOITE_DE_NUIT', '21 Quai des Antilles', 'Club électro réputé sur l’île de Nantes', NULL,47.2032, -1.5680, 8),
                                                                                                          ('Jardin des Plantes', 'PARC', 'Rue Stanislas Baudry', 'Grand jardin botanique en plein centre', NULL,47.2203, -1.5416, 8),
                                                                                                          ('Médiathèque Jacques Demy', 'BIBLIOTHEQUE', '24 Quai de la Fosse', 'Bibliothèque municipale centrale', NULL,47.2138, -1.5632, 8)
    ON CONFLICT (name) DO NOTHING;

-- Montpellier
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Rockstore', 'BAR', '12 Rue de l’Université', 'Bar étudiant animé avec concerts', NULL, 43.6110, 3.8770, 9),
                                                                                                          ('Le Black Sheep', 'BAR', '8 Rue des Écoles', 'Bar étudiant convivial', NULL, 43.6105, 3.8785, 9),
                                                                                                          ('Le Bistrot des Arts', 'BAR', '5 Rue du Palais des Guilhem', 'Bar étudiant culturel', NULL, 43.6102, 3.8790, 9),
                                                                                                          ('Le Factory', 'BAR', '14 Rue Jean Jacques Rousseau', 'Bar étudiant avec bonne ambiance', NULL, 43.6115, 3.8775, 9),
                                                                                                          ('Le Saint-Roch', 'BAR', '20 Rue Saint-Roch', 'Bar étudiant central et animé', NULL, 43.6120, 3.8760, 9),
                                                                                                          ('L’Antirouille', 'BOITE_DE_NUIT', '12 Rue Anatole France', 'Club et salle de concert incontournable', NULL,43.6092, 3.8765, 9),
                                                                                                          ('Parc du Peyrou', 'PARC', 'Place Royale du Peyrou', 'Parc historique avec vue sur l’aqueduc', NULL,43.6118, 3.8709, 9),
                                                                                                          ('Médiathèque Émile Zola', 'BIBLIOTHEQUE', '218 Boulevard de l’Aéroport International', 'Grande médiathèque moderne', NULL,43.6059, 3.9161, 9)
    ON CONFLICT (name) DO NOTHING;

-- Strasbourg
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Grincheux', 'BAR', '12 Rue du Vieux Marché aux Poissons', 'Bar étudiant avec ambiance conviviale', NULL, 48.5830, 7.7500, 10),
                                                                                                          ('Le Café Brant', 'BAR', '5 Rue Brant', 'Bar étudiant central', NULL, 48.5840, 7.7515, 10),
                                                                                                          ('Le Black Sheep', 'BAR', '3 Rue des Juifs', 'Bar étudiant animé', NULL, 48.5825, 7.7530, 10),
                                                                                                          ('Le Molodoï', 'BAR', '1 Rue du Général Rapp', 'Bar étudiant culturel et concerts', NULL, 48.5845, 7.7540, 10),
                                                                                                          ('Le Campus Café', 'BAR', '8 Rue de la Nuée Bleue', 'Bar étudiant proche université', NULL, 48.5835, 7.7520, 10),
                                                                                                          ('La Salamandre', 'BOITE_DE_NUIT', '3 Rue Paul Janet', 'Boîte de nuit emblématique à Strasbourg', NULL,48.5819, 7.7473, 10),
                                                                                                          ('Parc de l’Orangerie', 'PARC', 'Avenue de l’Europe', 'Grand parc verdoyant proche du Parlement européen', NULL,48.5954, 7.7695, 10),
                                                                                                          ('Médiathèque André Malraux', 'BIBLIOTHEQUE', '1 Presqu’île André Malraux', 'Bibliothèque moderne et spacieuse', NULL,48.5748, 7.7622, 10)
    ON CONFLICT (name) DO NOTHING;

-- Rennes
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
                                                                                                          ('Le Banjo', 'BAR', '4 Rue Saint-Michel', 'Bar étudiant avec musique', NULL, 48.1140, -1.6790, 11),
                                                                                                          ('Le Bistrot de la Cité', 'BAR', '10 Place de la République', 'Bar étudiant convivial', NULL, 48.1150, -1.6780, 11),
                                                                                                          ('Le Pôle Nord', 'BAR', '6 Rue du Chapitre', 'Bar étudiant central', NULL, 48.1135, -1.6775, 11),
                                                                                                          ('Le Domino', 'BAR', '12 Rue de la Monnaie', 'Bar étudiant animé', NULL, 48.1145, -1.6760, 11),
                                                                                                          ('Le St-Cyr', 'BAR', '8 Rue Saint-Cyr', 'Bar étudiant populaire', NULL, 48.1155, -1.6795, 11),
                                                                                                          ('Le Pym’s', 'BOITE_DE_NUIT', '4 Rue du Champ Jacquet', 'Boîte de nuit populaire chez les étudiants', NULL,48.1132, -1.6781, 11),
                                                                                                          ('Parc du Thabor', 'PARC', 'Place Saint-Mélaine', 'Superbe jardin public au cœur de Rennes', NULL,48.1148, -1.6748, 11),
                                                                                                          ('Bibliothèque des Champs Libres', 'BIBLIOTHEQUE', '10 Cours des Alliés', 'Bibliothèque moderne de Rennes Métropole', NULL,48.1069, -1.6720, 11)
    ON CONFLICT (name) DO NOTHING;




-- =====================================
-- IMAGES DES VILLES
-- =====================================

-- Mettez à jour les images des villes
UPDATE city SET image_url =
                    CASE
                        WHEN name = 'Paris' THEN '/uploads/paris.jpg'
                        WHEN name = 'Lyon' THEN '/uploads/lyon.jpg'
                        WHEN name = 'Marseille' THEN '/uploads/marseille.jpeg'
                        WHEN name = 'Toulouse' THEN '/uploads/toulouse.jpg'
                        WHEN name = 'Bordeaux' THEN '/uploads/bordeaux.jpg'
                        WHEN name = 'Lille' THEN '/uploads/lille.jpg'
                        WHEN name = 'Nice' THEN '/uploads/nice.jpg'
                        WHEN name = 'Nantes' THEN '/uploads/nantes.jpeg'
                        WHEN name = 'Montpellier' THEN '/uploads/montpellier.jpg'
                        WHEN name = 'Strasbourg' THEN '/uploads/strasbourg.jpg'
                        WHEN name = 'Rennes' THEN '/uploads/rennes.jpg'
                        END
WHERE image_url IS NULL;

ALTER TABLE place ADD COLUMN IF NOT EXISTS photos TEXT[];
-- Version sécurisée pour exécution multiple
UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Syndicat' THEN ARRAY['/uploads/places/syndicat_1.jpg', '/uploads/places/syndicat_2.jpg']
                         WHEN name = 'Little Red Door' THEN ARRAY['/uploads/places/littlered_1.jpg', '/uploads/places/littlered_2.jpg']
                         WHEN name = 'Harry''s New York Bar' THEN ARRAY['/uploads/places/harry_1.jpg', '/uploads/places/harry_2.jpg']
                         WHEN name = 'La Candelaria' THEN ARRAY['/uploads/places/candelaria_1.jpg', '/uploads/places/candelaria_2.jpg']
                         WHEN name = 'Le Comptoir Général' THEN ARRAY['/uploads/places/comptoir_1.jpg', '/uploads/places/comptoir_2.jpg']
                         WHEN name = 'Rex Club' THEN ARRAY['/uploads/places/rex_1.jpg', '/uploads/places/rex_2.jpg']
                         WHEN name = 'Jardin du Luxembourg' THEN ARRAY['/uploads/places/luxembourg_1.jpg', '/uploads/places/luxembourg_2.jpg']
                         WHEN name = 'Bibliothèque Sainte-Geneviève' THEN ARRAY['/uploads/places/genevieve_1.jpg', '/uploads/places/genevieve_2.jpg']
                         END
WHERE city_id = 1 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Sucre' THEN ARRAY['/uploads/places/sucre_1.jpg', '/uploads/places/sucre_2.jpg']
                         WHEN name = 'Ninkasi Gerland' THEN ARRAY['/uploads/places/ninkasi_1.jpg', '/uploads/places/ninkasi_2.jpg']
                         WHEN name = 'Soda Bar' THEN ARRAY['/uploads/places/soda_1.jpg', '/uploads/places/soda_2.jpg']
                         WHEN name = 'La Faute aux Ours' THEN ARRAY['/uploads/places/faute_1.jpg', '/uploads/places/faute_2.jpg']
                         WHEN name = 'L’Alibi' THEN ARRAY['/uploads/places/alibi_1.jpg', '/uploads/places/alibi_2.jpg']
                         WHEN name = 'Le Petit Salon' THEN ARRAY['/uploads/places/salon_1.jpg', '/uploads/places/salon_2.jpg']
                         WHEN name = 'Parc de la Tête d’Or' THEN ARRAY['/uploads/places/tete_1.jpg', '/uploads/places/tete_2.jpg']
                         WHEN name = 'Bibliothèque de la Part-Dieu' THEN ARRAY['/uploads/places/biblio_part_1.jpg', '/uploads/places/biblio_part_2.jpg']
                         END
WHERE city_id = 2 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'La Caravelle' THEN ARRAY['/uploads/places/caravelle_1.jpg', '/uploads/places/caravelle_2.jpg']
                         WHEN name = 'Carry Nation' THEN ARRAY['/uploads/places/carrynation_1.jpg', '/uploads/places/carrynation_2.jpg']
                         WHEN name = 'Le Bar de la Marine' THEN ARRAY['/uploads/places/bar_marine_1.jpg', '/uploads/places/bar_marine_2.jpg']
                         WHEN name = 'Le Shamrock' THEN ARRAY['/uploads/places/shamrock_1.jpg', '/uploads/places/shamrock_2.jpg']
                         WHEN name = 'Le Molotov' THEN ARRAY['/uploads/places/molotov_1.jpg', '/uploads/places/molotov_2.jpg']
                         WHEN name = 'Le Baby Club' THEN ARRAY['/uploads/places/babyclub_1.jpg', '/uploads/places/babyclub_2.jpg']
                         WHEN name = 'Parc Borély' THEN ARRAY['/uploads/places/borely_1.jpg', '/uploads/places/borely_2.jpg']
                         WHEN name = 'Alcazar BMVR' THEN ARRAY['/uploads/places/alcazar_1.jpg', '/uploads/places/alcazar_2.jpg']
                         END
WHERE city_id = 3 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'The House of Parliament' THEN ARRAY['/uploads/places/house_parliament_1.jpg', '/uploads/places/house_parliament_2.jpg']
                         WHEN name = 'Café Brun' THEN ARRAY['/uploads/places/cafe_brun_1.jpg', '/uploads/places/cafe_brun_2.jpg']
                         WHEN name = 'Le Lucifer' THEN ARRAY['/uploads/places/lucifer_1.jpg', '/uploads/places/lucifer_2.jpg']
                         WHEN name = 'Le Sherlock Holmes' THEN ARRAY['/uploads/places/sherlock_1.jpg', '/uploads/places/sherlock_2.jpg']
                         WHEN name = 'La Comtesse' THEN ARRAY['/uploads/places/comtesse_1.jpg', '/uploads/places/comtesse_2.jpg']
                         WHEN name = 'Le Theatro' THEN ARRAY['/uploads/places/theatro_1.jpg', '/uploads/places/theatro_2.jpg']
                         WHEN name = 'Jardin Public' THEN ARRAY['/uploads/places/jardin_public_1.jpg', '/uploads/places/jardin_public_2.jpg']
                         WHEN name = 'Bibliothèque Mériadeck' THEN ARRAY['/uploads/places/biblio_meria_1.jpg', '/uploads/places/biblio_meria_2.jpg']
                         END
WHERE city_id = 5 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Dandy' THEN ARRAY['/uploads/places/dandy_1.jpg', '/uploads/places/dandy_2.jpg']
                         WHEN name = 'Le Kremlin' THEN ARRAY['/uploads/places/kremlin_1.jpg', '/uploads/places/kremlin_2.jpg']
                         WHEN name = 'Le Tripostal Bar' THEN ARRAY['/uploads/places/tripostal_1.jpg', '/uploads/places/tripostal_2.jpg']
                         WHEN name = 'La Capsule' THEN ARRAY['/uploads/places/capsule_1.jpg', '/uploads/places/capsule_2.jpg']
                         WHEN name = 'La Pirogue' THEN ARRAY['/uploads/places/pirogue_1.jpg', '/uploads/places/pirogue_2.jpg']
                         WHEN name = 'Network Club' THEN ARRAY['/uploads/places/network_1.jpg', '/uploads/places/network_2.jpg']
                         WHEN name = 'Parc de la Citadelle' THEN ARRAY['/uploads/places/citadelle_1.jpg', '/uploads/places/citadelle_2.jpg']
                         WHEN name = 'Médiathèque Jean-Lévy' THEN ARRAY['/uploads/places/biblio_le_1.jpg', '/uploads/places/biblio_le_2.jpg']
                         END
WHERE city_id = 6 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Saint des Seins' THEN ARRAY['/uploads/places/saint_seins_1.jpg', '/uploads/places/saint_seins_2.jpg']
                         WHEN name = 'Le Murphy' THEN ARRAY['/uploads/places/murphy_1.jpg', '/uploads/places/murphy_2.jpg']
                         WHEN name = 'Le Connexion' THEN ARRAY['/uploads/places/connexion_1.jpg', '/uploads/places/connexion_2.jpg']
                         WHEN name = 'Le Daron' THEN ARRAY['/uploads/places/daron_1.jpg', '/uploads/places/daron_2.jpg']
                         WHEN name = 'Le Comptoir du Capitole' THEN ARRAY['/uploads/places/comptoir_capitole_1.jpg', '/uploads/places/comptoir_capitole_2.jpg']
                         WHEN name = 'L’Envol Côté Plage' THEN ARRAY['/uploads/places/envol_plage_1.jpg', '/uploads/places/envol_plage_2.jpg']
                         WHEN name = 'Jardin des Plantes' THEN ARRAY['/uploads/places/jardin_plantes_1.jpg', '/uploads/places/jardin_plantes_2.jpg']
                         WHEN name = 'Bibliothèque d’Étude et du Patrimoine' THEN ARRAY['/uploads/places/biblio_etude_1.jpg', '/uploads/places/biblio_etude_2.jpg']
                         END
WHERE city_id = 4 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Snug' THEN ARRAY['/uploads/places/snug_1.jpg', '/uploads/places/snug_2.jpg']
                         WHEN name = 'Le Shapko' THEN ARRAY['/uploads/places/shapko_1.jpg', '/uploads/places/shapko_2.jpg']
                         WHEN name = 'Le Glam' THEN ARRAY['/uploads/places/glam_1.jpg', '/uploads/places/glam_2.jpg']
                         WHEN name = 'Le Black Sheep' THEN ARRAY['/uploads/places/black_sheep_1.jpg', '/uploads/places/black_sheep_2.jpg']
                         WHEN name = 'Le Wayne’s' THEN ARRAY['/uploads/places/waynes_1.jpg', '/uploads/places/waynes_2.jpg']
                         WHEN name = 'High Club' THEN ARRAY['/uploads/places/high_club_1.jpg', '/uploads/places/high_club_2.jpg']
                         WHEN name = 'Parc de la Colline du Château' THEN ARRAY['/uploads/places/colline_chateau_1.jpg', '/uploads/places/colline_chateau_2.jpg']
                         WHEN name = 'Bibliothèque Louis Nucéra' THEN ARRAY['/uploads/places/biblio_nucera_1.jpg', '/uploads/places/biblio_nucera_2.jpg']
                         END
WHERE city_id = 7 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Nid' THEN ARRAY['/uploads/places/nid_1.jpg', '/uploads/places/nid_2.jpg']
                         WHEN name = 'Le Lieu Unique' THEN ARRAY['/uploads/places/lieu_unique_1.jpg', '/uploads/places/lieu_unique_2.jpg']
                         WHEN name = 'Le Clémenceau' THEN ARRAY['/uploads/places/clemenceau_1.jpg', '/uploads/places/clemenceau_2.jpg']
                         WHEN name = 'Le Brick' THEN ARRAY['/uploads/places/brick_1.jpg', '/uploads/places/brick_2.jpg']
                         WHEN name = 'Le McCarthy’s' THEN ARRAY['/uploads/places/mccarthys_1.jpg', '/uploads/places/mccarthys_2.jpg']
                         WHEN name = 'Le Warehouse' THEN ARRAY['/uploads/places/warehouse_1.jpg', '/uploads/places/warehouse_2.jpg']
                         WHEN name = 'Jardin des Plantes' THEN ARRAY['/uploads/places/jardin_plantes_1.jpg', '/uploads/places/jardin_plantes_2.jpg']
                         WHEN name = 'Médiathèque Jacques Demy' THEN ARRAY['/uploads/places/biblio_jacques_1.jpg', '/uploads/places/biblio_jacques_2.jpg']
                         END
WHERE city_id = 8 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Rockstore' THEN ARRAY['/uploads/places/rockstore_1.jpg', '/uploads/places/rockstore_2.jpg']
                         WHEN name = 'Le Black Sheep' THEN ARRAY['/uploads/places/black_sheep_1.jpg', '/uploads/places/black_sheep_2.jpg']
                         WHEN name = 'Le Bistrot des Arts' THEN ARRAY['/uploads/places/bistrot_arts_1.jpg', '/uploads/places/bistrot_arts_2.jpg']
                         WHEN name = 'Le Factory' THEN ARRAY['/uploads/places/factory_1.jpg', '/uploads/places/factory_2.jpg']
                         WHEN name = 'Le Saint-Roch' THEN ARRAY['/uploads/places/saint_roch_1.jpg', '/uploads/places/saint_roch_2.jpg']
                         WHEN name = 'L’Antirouille' THEN ARRAY['/uploads/places/antirouille_1.jpg', '/uploads/places/antirouille_2.jpg']
                         WHEN name = 'Parc du Peyrou' THEN ARRAY['/uploads/places/peyrou_1.jpg', '/uploads/places/peyrou_2.jpg']
                         WHEN name = 'Médiathèque Émile Zola' THEN ARRAY['/uploads/places/biblio_emile_1.jpg', '/uploads/places/biblio_emile_2.jpg']
                         END
WHERE city_id = 9 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Grincheux' THEN ARRAY['/uploads/places/grincheux_1.jpg', '/uploads/places/grincheux_2.jpg']
                         WHEN name = 'Le Café Brant' THEN ARRAY['/uploads/places/cafe_brant_1.jpg', '/uploads/places/cafe_brant_2.jpg']
                         WHEN name = 'Le Black Sheep' THEN ARRAY['/uploads/places/black_sheep_1.jpg', '/uploads/places/black_sheep_2.jpg']
                         WHEN name = 'Le Molodoï' THEN ARRAY['/uploads/places/molodoi_1.jpg', '/uploads/places/molodoi_2.jpg']
                         WHEN name = 'Le Campus Café' THEN ARRAY['/uploads/places/campus_cafe_1.jpg', '/uploads/places/campus_cafe_2.jpg']
                         WHEN name = 'La Salamandre' THEN ARRAY['/uploads/places/salamandre_1.jpg', '/uploads/places/salamandre_2.jpg']
                         WHEN name = 'Parc de l’Orangerie' THEN ARRAY['/uploads/places/orangerie_1.jpg', '/uploads/places/orangerie_2.jpg']
                         WHEN name = 'Médiathèque André Malraux' THEN ARRAY['/uploads/places/biblio_andre_1.jpg', '/uploads/places/biblio_andre_2.jpg']
                         END
WHERE city_id = 10 AND photos IS NULL;


UPDATE place SET photos =
                     CASE
                         WHEN name = 'Le Banjo' THEN ARRAY['/uploads/places/banjo_1.jpg', '/uploads/places/banjo_2.jpg']
                         WHEN name = 'Le Bistrot de la Cité' THEN ARRAY['/uploads/places/bistrot_cite_1.jpg', '/uploads/places/bistrot_cite_2.jpg']
                         WHEN name = 'Le Pôle Nord' THEN ARRAY['/uploads/places/pole_nord_1.jpg', '/uploads/places/pole_nord_2.jpg']
                         WHEN name = 'Le Domino' THEN ARRAY['/uploads/places/domino_1.jpg', '/uploads/places/domino_2.jpg']
                         WHEN name = 'Le St-Cyr' THEN ARRAY['/uploads/places/st_cyr_1.jpg', '/uploads/places/st_cyr_2.jpg']
                         WHEN name = 'Le Pym’s' THEN ARRAY['/uploads/places/pym_1.jpg', '/uploads/places/pym_2.jpg']
                         WHEN name = 'Parc du Thabor' THEN ARRAY['/uploads/places/thabor_1.jpg', '/uploads/places/thabor_2.jpg']
                         WHEN name = 'Bibliothèque des Champs Libres' THEN ARRAY['/uploads/places/biblio_champs_1.jpg', '/uploads/places/biblio_champs_2.jpg']
                         END
WHERE city_id = 11 AND photos IS NULL;

-- Script pour mettre à jour les descriptions des villes existantes
UPDATE city SET description = 'La ville lumière, capitale de la culture et de la gastronomie française' WHERE name = 'Paris';
UPDATE city SET description = 'Capitale de la gastronomie française, riche en histoire et culture' WHERE name = 'Lyon';
UPDATE city SET description = 'Ville portuaire dynamique au bord de la Méditerranée' WHERE name = 'Marseille';
UPDATE city SET description = 'La ville rose, centre de l''aéronautique et de la recherche' WHERE name = 'Toulouse';
UPDATE city SET description = 'Capitale mondiale du vin, ville d''art et d''histoire' WHERE name = 'Bordeaux';
UPDATE city SET description = 'Ville dynamique du Nord, centre culturel et étudiant' WHERE name = 'Lille';
UPDATE city SET description = 'Perle de la Côte d''Azur, entre mer et montagnes' WHERE name = 'Nice';
UPDATE city SET description = 'Ville créative et innovante de l''Ouest' WHERE name = 'Nantes';
UPDATE city SET description = 'Ville étudiante ensoleillée du Sud' WHERE name = 'Montpellier';
UPDATE city SET description = 'Capitale européenne, entre France et Allemagne' WHERE name = 'Strasbourg';
UPDATE city SET description = 'Capitale bretonne, ville jeune et dynamique' WHERE name = 'Rennes';

-- =====================================
-- PLACE PHOTOS
-- =====================================
-- Paris places
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

-- Lyon places
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
