-- Minimal fixture dataset for integration tests
-- Insert a city
INSERT INTO CITY (ID, NAME, DESCRIPTION, LATITUDE, LONGITUDE, IMAGE_URL) VALUES (1, 'TestCity', 'City used for automated tests', 48.8566, 2.3522, '');

-- Insert a place linked to the city
INSERT INTO PLACE (ID, NAME, CATEGORY, ADDRESS, DESCRIPTION, OPENING_HOURS, LATITUDE, LONGITUDE, CITY_ID) VALUES (1, 'TestPlace', 'BAR', '1 rue du Test', 'A place for tests', '09:00-18:00', 48.8566, 2.3522, 1);

-- Insert a photo for the place (element collection table 'place_photos')
INSERT INTO PLACE_PHOTOS (PLACE_ID, PHOTO_URL) VALUES (1, 'https://example.com/photo.jpg');

-- Minimal user profile
INSERT INTO USER_PROFILE (ID, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, YEAR_OF_BIRTH, CURRENT_CITY, COUNTRY_ORIGIN, PROFILE_PICTURE_URL, INSTAGRAM_URL, FACEBOOK_URL, X_URL, SHOW_PARTICIPATION_HISTORY)
VALUES (1, 'Test', 'User', 'test@example.com', 'secret', 1990, 'TestCity', 'TestCountry', '', '', '', '', TRUE);
