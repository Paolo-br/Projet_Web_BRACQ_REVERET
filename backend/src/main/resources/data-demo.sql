

insert into user_profile (first_name, last_name, email, password, year_of_birth, current_city, country_origin, profile_picture_url, instagram_url, facebook_url, x_url, show_participation_history) values
('Alice', 'Martin', 'alice.martin@example.com', 'password', 1995, 'Paris', 'France', '', '', '', '', true),
('Benoit', 'Dupont', 'benoit.dupont@example.com', 'password', 1990, 'Lyon', 'France', '', '', '', '', true),
('Camille', 'Leroy', 'camille.leroy@example.com', 'password', 1988, 'Marseille', 'France', '', '', '', '', true),
('David', 'Moreau', 'david.moreau@example.com', 'password', 1992, 'Paris', 'France', '', '', '', '', true),
('Emma', 'Petit', 'emma.petit@example.com', 'password', 1998, 'Lyon', 'France', '', '', '', '', true),
('Fabien', 'Garcia', 'fabien.garcia@example.com', 'password', 1985, 'Marseille', 'Spain', '', '', '', '', true),
('Grace', 'Nguyen', 'grace.nguyen@example.com', 'password', 1993, 'Paris', 'Vietnam', '', '', '', '', true),
('Hugo', 'Bernard', 'hugo.bernard@example.com', 'password', 1987, 'Lyon', 'France', '', '', '', '', true),
('Isabelle', 'Rousseau', 'isabelle.rousseau@example.com', 'password', 1991, 'Marseille', 'France', '', '', '', '', true),
('Jules', 'Fontaine', 'jules.fontaine@example.com', 'password', 1996, 'Paris', 'France', '', '', '', '', true),
('Karim', 'Saadi', 'karim.saadi@example.com', 'password', 1989, 'Paris', 'Algeria', '', '', '', '', true),
('Laura', 'Gomez', 'laura.gomez@example.com', 'password', 1994, 'Lyon', 'Spain', '', '', '', '', true),
('Marc', 'Dubois', 'marc.dubois@example.com', 'password', 1986, 'Marseille', 'France', '', '', '', '', true),
('Nora', 'Khan', 'nora.khan@example.com', 'password', 1997, 'Paris', 'Pakistan', '', '', '', '', true),
('Olivier', 'Leclerc', 'olivier.leclerc@example.com', 'password', 1984, 'Lyon', 'France', '', '', '', '', true),
('Pauline', 'Rivet', 'pauline.rivet@example.com', 'password', 1999, 'Marseille', 'France', '', '', '', '', true),
('Quentin', 'Marchal', 'quentin.marchal@example.com', 'password', 1992, 'Paris', 'France', '', '', '', '', true),
('Rania', 'El-Amrani', 'rania.elamrani@example.com', 'password', 1990, 'Lyon', 'Morocco', '', '', '', '', true),
('Sofia', 'Moretti', 'sofia.moretti@example.com', 'password', 1993, 'Marseille', 'Italy', '', '', '', '', true),
('Thomas', 'Germain', 'thomas.germain@example.com', 'password', 1983, 'Paris', 'France', '', '', '', '', true),
('Ula', 'Kowalska', 'ula.kowalska@example.com', 'password', 1995, 'Lyon', 'Poland', '', '', '', '', true),
('Victor', 'Ng', 'victor.ng@example.com', 'password', 1991, 'Marseille', 'Singapore', '', '', '', '', true),
('Winnie', 'Lam', 'winnie.lam@example.com', 'password', 1994, 'Paris', 'Hong Kong', '', '', '', '', true),
('Xavier', 'Petit', 'xavier.petit@example.com', 'password', 1982, 'Lyon', 'France', '', '', '', '', true),
('Yasmin', 'Farah', 'yasmin.farah@example.com', 'password', 1996, 'Marseille', 'Lebanon', '', '', '', '', true)
ON CONFLICT (email) DO NOTHING;


insert into participation (user_id, place_id, participation_date, status, created_at, arrival_time) values

((select id from user_profile where email='alice.martin@example.com'), (select id from place where name = 'Le Syndicat'), '2025-11-14', 'INSCRIT', '2025-11-11 10:00:00', '19:30:00'),
((select id from user_profile where email='benoit.dupont@example.com'), (select id from place where name = 'Le Sucre'), '2025-11-14', 'INSCRIT', '2025-11-11 10:05:00', '20:15:00'),
((select id from user_profile where email='camille.leroy@example.com'), (select id from place where name = 'La Caravelle'), '2025-11-14', 'INSCRIT', '2025-11-11 10:10:00', '19:45:00'),
((select id from user_profile where email='david.moreau@example.com'), (select id from place where name = 'Le Murphy'), '2025-11-14', 'INSCRIT', '2025-11-11 10:15:00', '20:00:00'),
((select id from user_profile where email='emma.petit@example.com'), (select id from place where name = 'The House of Parliament'), '2025-11-14', 'INSCRIT', '2025-11-11 10:20:00', '19:20:00'),
((select id from user_profile where email='fabien.garcia@example.com'), (select id from place where name = 'Le Dandy'), '2025-11-14', 'INSCRIT', '2025-11-11 10:25:00', '21:00:00'),
((select id from user_profile where email='grace.nguyen@example.com'), (select id from place where name = 'Le Snug'), '2025-11-14', 'INSCRIT', '2025-11-11 10:30:00', '20:30:00'),
((select id from user_profile where email='hugo.bernard@example.com'), (select id from place where name = 'Le Nid'), '2025-11-14', 'INSCRIT', '2025-11-11 10:35:00', '19:50:00'),
((select id from user_profile where email='isabelle.rousseau@example.com'), (select id from place where name = 'Le Rockstore'), '2025-11-14', 'INSCRIT', '2025-11-11 10:40:00', '21:15:00'),
((select id from user_profile where email='jules.fontaine@example.com'), (select id from place where name = 'Le Syndicat'), '2025-11-14', 'INSCRIT', '2025-11-11 10:45:00', '20:45:00'),
((select id from user_profile where email='karim.saadi@example.com'), (select id from place where name = 'Le Sucre'), '2025-11-14', 'INSCRIT', '2025-11-11 10:50:00', '19:40:00'),
((select id from user_profile where email='laura.gomez@example.com'), (select id from place where name = 'La Caravelle'), '2025-11-14', 'INSCRIT', '2025-11-11 10:55:00', '20:20:00'),
((select id from user_profile where email='marc.dubois@example.com'), (select id from place where name = 'Le Murphy'), '2025-11-14', 'INSCRIT', '2025-11-11 11:00:00', '21:30:00'),
((select id from user_profile where email='nora.khan@example.com'), (select id from place where name = 'The House of Parliament'), '2025-11-14', 'INSCRIT', '2025-11-11 11:05:00', '19:55:00'),
((select id from user_profile where email='olivier.leclerc@example.com'), (select id from place where name = 'Le Dandy'), '2025-11-14', 'INSCRIT', '2025-11-11 11:10:00', '20:10:00'),
((select id from user_profile where email='pauline.rivet@example.com'), (select id from place where name = 'Le Snug'), '2025-11-14', 'INSCRIT', '2025-11-11 11:15:00', '21:45:00'),
((select id from user_profile where email='quentin.marchal@example.com'), (select id from place where name = 'Le Nid'), '2025-11-14', 'INSCRIT', '2025-11-11 11:20:00', '19:35:00'),
((select id from user_profile where email='rania.elamrani@example.com'), (select id from place where name = 'Le Rockstore'), '2025-11-14', 'INSCRIT', '2025-11-11 11:25:00', '20:50:00'),
((select id from user_profile where email='sofia.moretti@example.com'), (select id from place where name = 'Le Sucre'), '2025-11-14', 'INSCRIT', '2025-11-11 11:30:00', '19:25:00'),
((select id from user_profile where email='thomas.germain@example.com'), (select id from place where name = 'La Caravelle'), '2025-11-14', 'INSCRIT', '2025-11-11 11:35:00', '20:40:00'),

((select id from user_profile where email='ula.kowalska@example.com'), (select id from place where name = 'Le Syndicat'), '2025-11-11', 'PRESENT', '2025-11-11 09:00:00', '19:15:00'),
((select id from user_profile where email='victor.ng@example.com'), (select id from place where name = 'Le Sucre'), '2025-11-11', 'INSCRIT', '2025-11-11 09:15:00', '20:05:00'),
((select id from user_profile where email='winnie.lam@example.com'), (select id from place where name = 'The House of Parliament'), '2025-11-11', 'INSCRIT', '2025-11-11 09:30:00', '19:50:00'),
((select id from user_profile where email='xavier.petit@example.com'), (select id from place where name = 'Jardin du Luxembourg'), '2025-11-11', 'INSCRIT', '2025-11-11 09:45:00', '20:25:00'),
((select id from user_profile where email='yasmin.farah@example.com'), (select id from place where name = 'Alcazar BMVR'), '2025-11-11', 'INSCRIT', '2025-11-11 10:00:00', '21:10:00')
ON CONFLICT (user_id, place_id, participation_date) DO NOTHING;
