INSERT INTO locations (name)
VALUES 'San Francisco';

INSERT INTO locations (name)
VALUES 'Tokyo';

INSERT INTO locations (name)
VALUES 'Rome';

INSERT INTO locations (name)
VALUES 'Hanoi';

-- SAN FRANCISCO
INSERT INTO landmarks (locationId, name) VALUES (1, "Golden Gate Bridge");
INSERT INTO landmarks (locationId, name) VALUES (1, "SF MOMA");
INSERT INTO landmarks (locationId, name) VALUES (1, "Delores Park");
INSERT INTO landmarks (locationId, name) VALUES (1, "Ferry Building");
INSERT INTO landmarks (locationId, name) VALUES (1, "Academy of Sciences");
INSERT INTO landmarks (locationId, name) VALUES (1, "Oracle Park");

-- TOKYO
INSERT INTO landmarks (locationId, name) VALUES (2, "Shinjuku Goen National Garden");
INSERT INTO landmarks (locationId, name) VALUES (2, "Meiji Jingu Shrine");
INSERT INTO landmarks (locationId, name) VALUES (2, "Tokyo Skytree");

-- ROME
INSERT INTO landmarks (locationId, name) VALUES (3, "Pantheon");
INSERT INTO landmarks (locationId, name) VALUES (3, "Colosseum");
INSERT INTO landmarks (locationId, name) VALUES (3, "Basilica di Santa Maria Maggiore");

-- HO CHI MINH CITY
INSERT INTO landmarks (locationId, name) VALUES (4, "Ben Thanh Street Food Market");
INSERT INTO landmarks (locationId, name) VALUES (4, "Ho Chi Minh Square");

-- SAN FRANCISCO
INSERT INTO questions (landmarkId, text) VALUES (1, "What color is the Golden Gate Bridge?");
INSERT INTO questions (landmarkId, text) VALUES (1, "How many arches are in the Golden Gate?");
INSERT INTO questions (landmarkId, text) VALUES (2, "On what street is SF MOMA located?");
INSERT INTO questions (landmarkId, text) VALUES (3, "Find the Miguel Hidalgo monument. What is his birth year?");
INSERT INTO questions (landmarkId, text) VALUES (4, "On what street is the Ferry Building located?");
INSERT INTO questions (landmarkId, text) VALUES (4, "What shape is the momument on Embarcadero and Howard?");
INSERT INTO questions (landmarkId, text) VALUES (5, "What animal is the giant skeleton of in the main lobby?");
INSERT INTO questions (landmarkId, text) VALUES (5, "What animal is the giant skeleton of in the main lobby?");
INSERT INTO questions (landmarkId, text) VALUES (6, "Oracle park is home to what baseball team?");

-- TOKYO
INSERT INTO questions (landmarkId, text) VALUES (7, "Which of the following is not one of the 3 park gates?");
INSERT INTO questions (landmarkId, text) VALUES (8, "How many rows of sake barrels are there near the park entrance?");
INSERT INTO questions (landmarkId, text) VALUES (9, "Which is taller: Tokyo Skytree or Tokyo Tower?");

-- ROME
INSERT INTO questions (landmarkId, text) VALUES (10, "What in inscribed on the front of the Pantheon?");
INSERT INTO questions (landmarkId, text) VALUES (10, "Which of the painters below has a tomb in the Pantheon?");
INSERT INTO questions (landmarkId, text) VALUES (11, "How many rows of windows are there in the Colosseum?");
INSERT INTO questions (landmarkId, text) VALUES (12, "On what street is the Basilica located?");

-- VIETNAM
INSERT INTO questions (landmarkId, text) VALUES (14, "What district is Ho Chi Minh Square located?");

-- IMAGES
UPDATE landmarks SET url = "/images/locations/goldengate.jpg"
WHERE id = 1;
UPDATE landmarks SET url = "/images/locations/sfmoma.jpg"
WHERE id = 2;
UPDATE landmarks SET url = "/images/locations/dolores.jpeg"
WHERE id = 3;
UPDATE landmarks SET url = "/images/locations/ferrybuilding.jpg"
WHERE id = 4;
UPDATE landmarks SET url = "/images/locations/calacademy.jpg"
WHERE id = 5;
UPDATE landmarks SET url = "/images/locations/oraclepark.jpg"
WHERE id = 6;
UPDATE landmarks SET url = "/images/locations/shinjukugoen.jpg"
WHERE id = 7;
UPDATE landmarks SET url = "/images/locations/meiji.jpg"
WHERE id = 8;
UPDATE landmarks SET url = "/images/locations/skytree.jpg"
WHERE id = 9;
UPDATE landmarks SET url = "/images/locations/pantheon.jpeg"
WHERE id = 10;
UPDATE landmarks SET url = "/images/locations/colosseum.jpg"
WHERE id = 11;
UPDATE landmarks SET url = "/images/locations/basilica_maggiore.jpg"
WHERE id = 12;
UPDATE landmarks SET url = "/images/locations/ben_thanh.jpg"
WHERE id = 13;
UPDATE landmarks SET url = "/images/locations/hcmc_square.jpg"
WHERE id = 14;