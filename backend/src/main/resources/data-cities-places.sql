-- =====================================
-- FICHIER 1 : VILLES ET LIEUX
-- =====================================
-- Ce fichier gère uniquement les villes et les lieux (sans les photos)
-- Les photos sont gérées dans le fichier photos.sql

-- =====================================
-- CITIES
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
(9, 'Montpellier', 'Ville étudiante ensoleillée du Sud', 43.6108, 3.8767, '/uploads/city/montpellier.jpg'),
(10, 'Strasbourg', 'Capitale européenne, entre France et Allemagne', 48.5734, 7.7521, '/uploads/city/strasbourg.jpg'),
(11, 'Rennes', 'Capitale bretonne, ville jeune et dynamique', 48.1173, -1.6778, '/uploads/city/rennes.jpg')
ON CONFLICT (id) DO NOTHING;

-- Réinitialiser la séquence pour l'auto-increment
SELECT setval('city_id_seq', (SELECT MAX(id) FROM city));

-- =====================================
-- PLACES
-- =====================================
-- Contrainte d'unicité sur le nom
ALTER TABLE place DROP CONSTRAINT IF EXISTS unique_place_name;
ALTER TABLE place ADD CONSTRAINT unique_place_name UNIQUE(name);

-- Paris (city_id = 1)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Syndicat', 'BAR', '51 Rue du Faubourg Saint-Denis', 'Bar à cocktails créatif', NULL, 48.8721, 2.3540, 1),
('Little Red Door', 'BAR', '60 Rue Charlot', 'Bar intimiste réputé', NULL, 48.8626, 2.3631, 1),
('Harry''s New York Bar', 'BAR', '5 Rue Daunou', 'Bar historique de Paris', NULL, 48.8696, 2.3322, 1),
('La Candelaria', 'BAR', '52 Rue de Saintonge', 'Bar caché derrière une taqueria', NULL, 48.8628, 2.3626, 1),
('Le Comptoir Général', 'BAR', '80 Quai de Jemmapes', 'Lieu atypique ambiance africaine', NULL, 48.8727, 2.3643, 1),
('Rex Club', 'BOITE_DE_NUIT', '5 Boulevard Poissonnière', 'Club électro emblématique de Paris', NULL, 48.8714, 2.3470, 1),
('Jardin du Luxembourg', 'PARC', 'Rue de Médicis', 'Grand parc emblématique du 6e arrondissement', NULL, 48.8462, 2.3371, 1),
('Bibliothèque Sainte-Geneviève', 'BIBLIOTHEQUE', '10 Place du Panthéon', 'Bibliothèque universitaire historique', NULL, 48.8467, 2.3471, 1),
('Musée du Louvre', 'MUSEE', 'Rue de Rivoli', 'Le musée du Louvre, vaste collection d''art et d''antiquités, palais historique.', NULL, 48.8606, 2.3376, 1),
('Musée d''Orsay', 'MUSEE', '1 Rue de la Légion d''Honneur', 'Musée consacré à l''art occidental du XIXe siècle, installé dans une ancienne gare.', NULL, 48.8600, 2.3266, 1),
('Cathédrale Notre-Dame de Paris', 'MONUMENT_HISTORIQUE', '6 Parvis Notre-Dame - Pl. Jean-Paul II', 'Cathédrale gothique emblématique de Paris, monument historique majeur.', NULL, 48.852968, 2.349902, 1),
('Parc des Buttes-Chaumont', 'PARC', '1 Rue Botzaris', 'Grand parc vallonné avec falaises, grotte et pont suspendu.', NULL, 48.8809, 2.3810, 1)
ON CONFLICT (name) DO NOTHING;

-- Lyon (city_id = 2)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Sucre', 'BAR', '50 Quai Rambaud', 'Bar rooftop sur la Confluence', NULL, 45.7366, 4.8156, 2),
('Ninkasi Gerland', 'BAR', '267 Rue Marcel Mérieux', 'Temple des bières artisanales', NULL, 45.7331, 4.8271, 2),
('Soda Bar', 'BAR', '7 Rue de la Martinière', 'Bar à cocktails animé', NULL, 45.7690, 4.8273, 2),
('La Faute aux Ours', 'BAR', '4 Rue de la Barre', 'Bar étudiant convivial', NULL, 45.7578, 4.8353, 2),
('L''Alibi', 'BAR', '19 Rue du Palais Grillet', 'Cocktails & musique', NULL, 45.7617, 4.8351, 2),
('Le Petit Salon', 'BOITE_DE_NUIT', '3 Rue Cronstadt', 'Club réputé pour sa programmation électro', NULL, 45.7455, 4.8378, 2),
('Parc de la Tête d''Or', 'PARC', 'Boulevard des Belges', 'Plus grand parc urbain de France', NULL, 45.7763, 4.8519, 2),
('Bibliothèque de la Part-Dieu', 'BIBLIOTHEQUE', '30 Boulevard Marius Vivier Merle', 'Grande bibliothèque municipale de Lyon', NULL, 45.7605, 4.8592, 2),
('Musée des Confluences', 'MUSEE', '86 Quai Perrache', 'Musée des sciences et des sociétés, architecture contemporaine remarquable.', NULL, 45.7379, 4.8176, 2),
('Musée des Beaux-Arts de Lyon', 'MUSEE', '20 Place des Terreaux', 'Collections d''arts anciens et modernes dans un ancien couvent.', NULL, 45.7670, 4.8340, 2),
('Basilique Notre-Dame de Fourvière', 'MONUMENT_HISTORIQUE', '8 Place de Fourvière', 'Basilique emblématique offrant une vue panoramique sur Lyon.', NULL, 45.7622, 4.8229, 2),
('Parc de Gerland', 'PARC', 'Allée du Parc de Gerland', 'Parc urbain au sud-est de Lyon, espace sportif et nature.', NULL, 45.7303, 4.8555, 2)
ON CONFLICT (name) DO NOTHING;

-- Marseille (city_id = 3)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('La Caravelle', 'BAR', '34 Quai du Port', 'Bar avec vue sur le Vieux-Port', NULL, 43.2951, 5.3745, 3),
('Carry Nation', 'BAR', 'Adresse secrète sur réservation', 'Speakeasy caché', NULL, 43.2965, 5.3698, 3),
('Le Bar de la Marine', 'BAR', 'Quai de Rive Neuve', 'Bar classique marseillais', NULL, 43.2938, 5.3676, 3),
('Le Shamrock', 'BAR', '13 Quai de Rive Neuve', 'Pub irlandais', NULL, 43.2935, 5.3671, 3),
('Le Molotov', 'BAR', '3 Place Paul Cézanne', 'Bar-concert alternatif', NULL, 43.2960, 5.3833, 3),
('Le Baby Club', 'BOITE_DE_NUIT', '2 Rue André Poggioli', 'Club techno underground de Marseille', NULL, 43.2966, 5.3813, 3),
('Parc Borély', 'PARC', 'Avenue du Prado', 'Parc emblématique de Marseille', NULL, 43.2629, 5.3852, 3),
('Alcazar BMVR', 'BIBLIOTHEQUE', '58 Cours Belsunce', 'Bibliothèque municipale à vocation régionale', NULL, 43.2981, 5.3784, 3),
('MuCEM', 'MUSEE', '7 Prom. Robert Laffont', 'Musée des civilisations de l''Europe et de la Méditerranée, musée national et lieu culturel.', NULL, 43.2961, 5.3590, 3),
('Musée d''Histoire de Marseille', 'MUSEE', '2 Rue Henri Barbusse', 'Musée retraçant l''histoire millénaire de la cité phocéenne.', NULL, 43.2952, 5.3668, 3),
('Château d''If', 'MONUMENT_HISTORIQUE', 'Île d''If', 'Forteresse-citadelle sur une île légendaire, célèbre grâce à "Monte-Cristo".', NULL, 43.3007, 5.3675, 3),
('Parc Longchamp', 'PARC', 'Boulevard du Jardin Zoologique', 'Parc et jardin entourant le Palais Longchamp et son palais des beaux-arts.', NULL, 43.2951, 5.3910, 3)
ON CONFLICT (name) DO NOTHING;

-- Toulouse (city_id = 4)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Saint des Seins', 'BAR', '10 Rue Gabriel Péri', 'Bar étudiant convivial', NULL, 43.6040, 1.4445, 4),
('Le Murphy', 'BAR', '5 Rue Gabriel Péri', 'Bar avec ambiance étudiante', NULL, 43.6038, 1.4425, 4),
('Le Connexion', 'BAR', '20 Rue des Lois', 'Bar étudiant avec concerts', NULL, 43.6032, 1.4450, 4),
('Le Daron', 'BAR', '12 Rue Saint-Rome', 'Bar étudiant sympa', NULL, 43.6015, 1.4420, 4),
('Le Comptoir du Capitole', 'BAR', '4 Place du Capitole', 'Bar étudiant central', NULL, 43.6045, 1.4442, 4),
('L''Envol Côté Plage', 'BOITE_DE_NUIT', 'Avenue Jean Gonord', 'Boîte de nuit en plein air très populaire', NULL, 43.6115, 1.4810, 4),
('Jardin des Plantes', 'PARC', '31 Allée Jules Guesde', 'Grand parc historique du centre-ville', NULL, 43.5925, 1.4455, 4),
('Bibliothèque d''Étude et du Patrimoine', 'BIBLIOTHEQUE', '1 Rue de Périgord', 'Bibliothèque municipale de Toulouse', NULL, 43.6045, 1.4460, 4),
('Musée des Augustins', 'MUSEE', '21 Rue de Metz', 'Musée des Beaux-Arts installé dans un ancien monastère médiéval.', NULL, 43.6009, 1.4430, 4),
('Musée Saint-Raymond', 'MUSEE', 'Place du Musée', 'Musée archéologique et collections antiques.', NULL, 43.6002, 1.4425, 4),
('Capitole de Toulouse', 'MONUMENT_HISTORIQUE', 'Place du Capitole', 'Immeuble emblématique et centre historique de la ville.', NULL, 43.6045, 1.4442, 4),
('Prairie des Filtres', 'PARC', 'Quai de la Daurade', 'Espace vert en bordure de la Garonne, lieu de promenade et d''événements.', NULL, 43.6020, 1.4440, 4)
ON CONFLICT (name) DO NOTHING;

-- Bordeaux (city_id = 5)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('The House of Parliament', 'BAR', '22 Cours Alsace-Lorraine', 'Pub anglais convivial', NULL, 44.8372, -0.5736, 5),
('Café Brun', 'BAR', '45 Rue Saint-Rémi', 'Bar étudiant historique', NULL, 44.8413, -0.5737, 5),
('Le Lucifer', 'BAR', '35 Rue de Pessac', 'Bar rock culte', NULL, 44.8320, -0.5813, 5),
('Le Sherlock Holmes', 'BAR', '16 Cours de l''Intendance', 'Ambiance britannique', NULL, 44.8419, -0.5766, 5),
('La Comtesse', 'BAR', '25 Rue Parlement Sainte-Catherine', 'Cocktails raffinés', NULL, 44.8387, -0.5721, 5),
('Le Theatro', 'BOITE_DE_NUIT', '72 Rue du Loup', 'Club branché du centre-ville', NULL, 44.8392, -0.5735, 5),
('Jardin Public', 'PARC', 'Cours de Verdun', 'Parc historique en plein cœur de Bordeaux', NULL, 44.8491, -0.5775, 5),
('Bibliothèque Mériadeck', 'BIBLIOTHEQUE', '85 Cours du Maréchal Juin', 'Grande bibliothèque municipale', NULL, 44.8385, -0.5852, 5),
('Musée d''Aquitaine', 'MUSEE', '20 Cours Pasteur', 'Musée consacré à l''histoire de la région aquitaine et de Bordeaux.', NULL, 44.8415, -0.5790, 5),
('Musée des Beaux-Arts de Bordeaux', 'MUSEE', '20 Cours d''Albret', 'Collections de peintures et sculptures du XIVe au XXe siècle.', NULL, 44.8401, -0.5738, 5),
('Cathédrale Saint-André', 'MONUMENT_HISTORIQUE', 'Place Pey-Berland', 'Cathédrale gothique et monument historique au cœur de Bordeaux.', NULL, 44.8413, -0.5749, 5),
('Parc Bordelais', 'PARC', 'Cours de l''Argonne', 'Grand parc urbain avec étangs, aire de jeux et promenades.', NULL, 44.8734, -0.5586, 5)

ON CONFLICT (name) DO NOTHING;

-- Lille (city_id = 6)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Dandy', 'BAR', '67 Rue Basse', 'Bar à cocktails élégant', NULL, 50.6422, 3.0621, 6),
('Le Kremlin', 'BAR', '51 Rue Jean-Jacques Rousseau', 'Bar à vodka original', NULL, 50.6359, 3.0628, 6),
('Le Tripostal Bar', 'BAR', 'Avenue Willy Brandt', 'Lieu culturel et bar', NULL, 50.6376, 3.0751, 6),
('La Capsule', 'BAR', '25 Rue des Trois Mollettes', 'Spécialité bières artisanales', NULL, 50.6419, 3.0634, 6),
('La Pirogue', 'BAR', '59 Rue de Gand', 'Cocktails exotiques', NULL, 50.6416, 3.0655, 6),
('Network Club', 'BOITE_DE_NUIT', '15 Rue du Faisan', 'Club électro au cœur du Vieux-Lille', NULL, 50.6374, 3.0637, 6),
('Parc de la Citadelle', 'PARC', 'Avenue Mathias Delobel', 'Grand espace vert autour de la Citadelle', NULL, 50.6408, 3.0436, 6),
('Médiathèque Jean-Lévy', 'BIBLIOTHEQUE', '32-34 Rue Édouard Delesalle', 'Bibliothèque municipale centrale', NULL, 50.6339, 3.0654, 6),
('Palais des Beaux-Arts de Lille', 'MUSEE', 'Place de la République', 'Un des plus grands musées de France avec peintures et sculptures.', NULL, 50.6330, 3.0600, 6),
('La Piscine - Musée d''Art et d''Industrie (Roubaix)', 'MUSEE', '23 Boulevard de la République', 'Musée installé dans une ancienne piscine Art Déco (proche de Lille).', NULL, 50.6903, 3.1639, 6),
('Vieille Bourse', 'MONUMENT_HISTORIQUE', 'Place du Général de Gaulle', 'Ancien bâtiment emblématique du commerce, monument historique.', NULL, 50.6369, 3.0636, 6),
('Parc Jean-Baptiste Lebas', 'PARC', 'Rue Gosselet', 'Parc urbain agréable proche du centre-ville.', NULL, 50.6332, 3.0643, 6)

ON CONFLICT (name) DO NOTHING;

-- Nice (city_id = 7)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Snug', 'BAR', '2 Rue de la Préfecture', 'Bar étudiant avec bonne ambiance', NULL, 43.6978, 7.2716, 7),
('Le Shapko', 'BAR', '9 Rue Rossetti', 'Bar étudiant avec musique live', NULL, 43.6960, 7.2722, 7),
('Le Glam', 'BAR', '15 Rue Defly', 'Bar étudiant convivial', NULL, 43.6951, 7.2735, 7),
('Le Black Sheep', 'BAR', '20 Rue Barillerie', 'Bar étudiant animé', NULL, 43.6958, 7.2730, 7),
('Le Wayne''s', 'BAR', '6 Rue Masséna', 'Bar étudiant populaire', NULL, 43.6970, 7.2738, 7),
('High Club', 'BOITE_DE_NUIT', '45 Promenade des Anglais', 'Boîte de nuit emblématique sur la Promenade', NULL, 43.6950, 7.2595, 7),
('Parc de la Colline du Château', 'PARC', 'Rue des Ponchettes', 'Parc avec vue panoramique sur la baie', NULL, 43.6944, 7.2798, 7),
('Bibliothèque Louis Nucéra', 'BIBLIOTHEQUE', '2 Place Yves Klein', 'Grande bibliothèque municipale moderne', NULL, 43.7045, 7.2800, 7),
('Musée Matisse', 'MUSEE', '164 Av. des Arènes de Cimiez', 'Musée consacré à l''œuvre d''Henri Matisse.', NULL, 43.7250, 7.2650, 7),
('MAMAC', 'MUSEE', 'Place Yves Klein', 'Musée d''Art Moderne et d''Art Contemporain de Nice.', NULL, 43.6970, 7.2706, 7),
('Cathédrale Sainte-Réparate', 'MONUMENT_HISTORIQUE', 'Place Rossetti', 'Cathédrale baroque située dans le Vieux-Nice.', NULL, 43.6976, 7.2745, 7),
('Promenade du Paillon', 'PARC', 'Prom. du Paillon', 'Grand espace vert linéaire au cœur de Nice, parc urbain et aires ludiques.', NULL, 43.6973, 7.2703, 7)

ON CONFLICT (name) DO NOTHING;

-- Nantes (city_id = 8)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Nid', 'BAR', '1 Place Graslin', 'Bar étudiant avec vue', NULL, 47.2120, -1.5540, 8),
('Le Lieu Unique', 'BAR', '2 Quai Ferdinand Favre', 'Bar étudiant culturel', NULL, 47.2125, -1.5560, 8),
('Le Clémenceau', 'BAR', '5 Rue de Strasbourg', 'Bar étudiant central', NULL, 47.2150, -1.5505, 8),
('Le Brick', 'BAR', '10 Rue Kervegan', 'Bar étudiant convivial', NULL, 47.2180, -1.5562, 8),
('Le McCarthy''s', 'BAR', '8 Rue de la Fosse', 'Pub/bar étudiant', NULL, 47.2185, -1.5535, 8),
('Le Warehouse', 'BOITE_DE_NUIT', '21 Quai des Antilles', 'Club électro réputé sur l''île de Nantes', NULL, 47.2032, -1.5680, 8),
('Jardin des Plantes de Nantes', 'PARC', 'Rue Stanislas Baudry', 'Grand jardin botanique en plein centre', NULL, 47.2203, -1.5416, 8),
('Médiathèque Jacques Demy', 'BIBLIOTHEQUE', '24 Quai de la Fosse', 'Bibliothèque municipale centrale', NULL, 47.2138, -1.5632, 8),
('Musée d''arts de Nantes', 'MUSEE', '10 Rue Georges Clemenceau', 'Musée municipal d''art ancien et moderne.', NULL, 47.2176, -1.5536, 8),
('Musée Dobrée', 'MUSEE', '1 Rue Dobrée', 'Musée d''archéologie et d''arts décoratifs, riche collection régionale.', NULL, 47.2120, -1.5640, 8),
('Château des Ducs de Bretagne', 'MONUMENT_HISTORIQUE', '4 Place Marc Elder', 'Forteresse historique et musée consacré à l''histoire de Nantes.', NULL, 47.2136, -1.5535, 8),
('Parc de Procé', 'PARC', 'Boulevard Charles de Gaulle', 'Parc paysager avec jardins, idéal pour la promenade.', NULL, 47.2390, -1.5550, 8)

ON CONFLICT (name) DO NOTHING;

-- Montpellier (city_id = 9)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Rockstore', 'BAR', '12 Rue de l''Université', 'Bar étudiant animé avec concerts', NULL, 43.6110, 3.8770, 9),
('Black Sheep ', 'BAR', '8 Rue des Écoles', 'Bar étudiant convivial', NULL, 43.6105, 3.8785, 9),
('Le Bistrot des Arts', 'BAR', '5 Rue du Palais des Guilhem', 'Bar étudiant culturel', NULL, 43.6102, 3.8790, 9),
('Le Factory', 'BAR', '14 Rue Jean Jacques Rousseau', 'Bar étudiant avec bonne ambiance', NULL, 43.6115, 3.8775, 9),
('Le Saint-Roch', 'BAR', '20 Rue Saint-Roch', 'Bar étudiant central et animé', NULL, 43.6120, 3.8760, 9),
('L''Antirouille', 'BOITE_DE_NUIT', '12 Rue Anatole France', 'Club et salle de concert incontournable', NULL, 43.6092, 3.8765, 9),
('Parc du Peyrou', 'PARC', 'Place Royale du Peyrou', 'Parc historique avec vue sur l''aqueduc', NULL, 43.6118, 3.8709, 9),
('Médiathèque Émile Zola', 'BIBLIOTHEQUE', '218 Boulevard de l''Aéroport International', 'Grande médiathèque moderne', NULL, 43.6059, 3.9161, 9),
('Musée Fabre', 'MUSEE', '39 Bd Bonne Nouvelle', 'Musée des Beaux-Arts de Montpellier, collections importantes.', NULL, 43.6078, 3.8765, 9),
('Musée Atger', 'MUSEE', '34 Rue du Musée', 'Musée de dessins et collections universitaires (petite collection spécialisée).', NULL, 43.6105, 3.8760, 9),
('Cathédrale Saint-Pierre de Montpellier', 'MONUMENT_HISTORIQUE', 'Place Saint-Pierre', 'Cathédrale gothique monumentale au cœur de la ville.', NULL, 43.6110, 3.8770, 9),
('Jardin des Plantes de Montpellier', 'PARC', 'Boulevard Henri IV', 'Un des plus anciens jardins botaniques d''Europe.', NULL, 43.6230, 3.8790, 9)

ON CONFLICT (name) DO NOTHING;

-- Strasbourg (city_id = 10)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Grincheux', 'BAR', '12 Rue du Vieux Marché aux Poissons', 'Bar étudiant avec ambiance conviviale', NULL, 48.5830, 7.7500, 10),
('Le Café Brant', 'BAR', '5 Rue Brant', 'Bar étudiant central', NULL, 48.5840, 7.7515, 10),
('Code Bar', 'BAR', '39 Rue du Vieil-Hôpital', 'Bar étudiant animé', NULL, 48.5807, 7.7501, 10),
('Le Molodoï', 'BAR', '1 Rue du Général Rapp', 'Bar étudiant culturel et concerts', NULL, 48.5845, 7.7540, 10),
('Le Campus Café', 'BAR', '8 Rue de la Nuée Bleue', 'Bar étudiant proche université', NULL, 48.5835, 7.7520, 10),
('La Salamandre', 'BOITE_DE_NUIT', '3 Rue Paul Janet', 'Boîte de nuit emblématique à Strasbourg', NULL, 48.5819, 7.7473, 10),
('Parc de l''Orangerie', 'PARC', 'Avenue de l''Europe', 'Grand parc verdoyant proche du Parlement européen', NULL, 48.5954, 7.7695, 10),
('Médiathèque André Malraux', 'BIBLIOTHEQUE', '1 Presqu''île André Malraux', 'Bibliothèque moderne et spacieuse', NULL, 48.5748, 7.7622, 10),
('Musée Alsacien', 'MUSEE', '23-25 Quai Saint-Nicolas', 'Musée consacré aux traditions et au patrimoine alsaciens.', NULL, 48.5799, 7.7510, 10),
('Musée d''Art Moderne et Contemporain de Strasbourg', 'MUSEE', '1 Place Hans-Jean-Arp', 'Collections d''art moderne et contemporain.', NULL, 48.5836, 7.7418, 10),
('Cathédrale Notre-Dame de Strasbourg', 'MONUMENT_HISTORIQUE', 'Place de la Cathédrale', 'Cathédrale gothique emblématique, monument historique.', NULL, 48.5814, 7.7508, 10),
('Parc de la Citadelle', 'PARC', 'Allée de la Citadelle', 'Parc urbain proche du centre et de la citadelle.', NULL, 48.5790, 7.7720, 10)

ON CONFLICT (name) DO NOTHING;

-- Rennes (city_id = 11)
INSERT INTO place (name, category, address, description, opening_hours, latitude, longitude, city_id) VALUES
('Le Banjo', 'BAR', '4 Rue Saint-Michel', 'Bar étudiant avec musique', NULL, 48.1140, -1.6790, 11),
('Le Bistrot de la Cité', 'BAR', '10 Place de la République', 'Bar étudiant convivial', NULL, 48.1150, -1.6780, 11),
('Le Pôle Nord', 'BAR', '6 Rue du Chapitre', 'Bar étudiant central', NULL, 48.1135, -1.6775, 11),
('Le Domino', 'BAR', '12 Rue de la Monnaie', 'Bar étudiant animé', NULL, 48.1145, -1.6760, 11),
('Le St-Cyr', 'BAR', '8 Rue Saint-Cyr', 'Bar étudiant populaire', NULL, 48.1155, -1.6795, 11),
('Le Pym''s', 'BOITE_DE_NUIT', '4 Rue du Champ Jacquet', 'Boîte de nuit populaire chez les étudiants', NULL, 48.1132, -1.6781, 11),
('Parc du Thabor', 'PARC', 'Place Saint-Mélaine', 'Superbe jardin public au cœur de Rennes', NULL, 48.1148, -1.6748, 11),
('Bibliothèque des Champs Libres', 'BIBLIOTHEQUE', '10 Cours des Alliés', 'Bibliothèque moderne de Rennes Métropole', NULL, 48.1069, -1.6720, 11),
('Musée de Bretagne', 'MUSEE', 'Les Champs Libres, 10 Cours des Alliés', 'Musée dédié à l''histoire et à la culture de la Bretagne.', NULL, 48.1069, -1.6720, 11),
('Musée des Beaux-Arts de Rennes', 'MUSEE', '20 Place Saint-Germain', 'Collections de peintures et sculptures, musée municipal.', NULL, 48.1128, -1.6790, 11),
('Cathédrale Saint-Pierre de Rennes', 'MONUMENT_HISTORIQUE', 'Place de la Cathédrale', 'Cathédrale historique de Rennes.', NULL, 48.1119, -1.6797, 11),
('Parc des Gayeulles', 'PARC', 'Rue de Gayeulles', 'Grand parc urbain avec vastes espaces verts et équipements sportifs.', NULL, 48.1325, -1.6690, 11)

ON CONFLICT (name) DO NOTHING;
