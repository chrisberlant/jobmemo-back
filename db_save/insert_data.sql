BEGIN;

-- Inserting dummy users data
-- We insert the id manually to be able to create the cards belonging to the users
-- If we do not provide it, it will be generated randomly by gen_random_uuid()
INSERT INTO "user" ("id", "email", "first_name", "last_name", "password", "avatar_url", "address") VALUES
('235c1fb1-5dbe-4cb6-b18e-78b3554c80af', 'chuck.norris@gmail.com', 'Chuck', 'Norris', 'azerty', 'chuck.jpg', '1 Parvis de la Défense');
INSERT INTO "user" ("id", "email", "first_name", "last_name", "password", "avatar_url", "address") VALUES
('d4ddb3ae-e748-44dd-aacb-a3eced9dda85', 'bruce.lee@free.fr', 'bruce', 'lee', 'qwerty', '/img/default_avatar.png', 'Hong-Kong');
INSERT INTO "user" ("id", "email", "first_name", "last_name", "password", "avatar_url", "address") VALUES
('7dbcfb4a-639c-401d-b2a8-0f6d5511fece', 'mickey.mouse@disney.fr', 'Mickey', 'Mouse', 'Minnie', 'mickey.jpg', 'Disneyland');

-- Inserting dummy cards data
INSERT INTO "card" ("id", "title", "category", "index", "enterprise_name", "enterprise_activity", "contract_type", "description", "offer_url", "location", "salary", "job_title", "notation", "color", "is_deleted", "notes", "reminder", "logo_url", "created_at", "user_id") VALUES
('407f545b-7950-4294-84cb-7af0e4f80d03', 'Carte Airbus', 'Mes offres', 0, 'Airbus', 'Aviation', 'Alternance', 'Offre en alternance de reponsable RH', 'http://linkedin.com/lien_offre', 'Toulouse', '900€ par mois', 'Reponsable RH', 1, 'blue', 'f', 'Uniquement si pas dautre choix', '2023-08-05 00:00:00+00', 'http://www.airbus.fr/logo_airbus.jpg', '2023-07-25 13:43:58.121+00', '235c1fb1-5dbe-4cb6-b18e-78b3554c80af');
INSERT INTO "card" ("id", "title", "category", "index", "enterprise_name", "enterprise_activity", "contract_type", "description", "offer_url", "location", "salary", "job_title", "notation", "color", "is_deleted", "notes", "reminder", "logo_url", "created_at", "user_id") VALUES
('a892f6e2-3dbb-45b2-bf10-fe99ed504570', 'Carte EDF', 'Mes candidatures', 2, 'EDF', 'Fournisseur d''énergie', 'CDI', 'Offre en CDI pour technicien de maintenance électrique', 'http://www.indeed.fr/offre_edf', 'Paris', '25.000€ annuels', 'Technicien de maintenance électrique', 5, 'red', 'f', 'Notes à renseigner', '2023-08-04 00:00:00+00', 'http://www.edf.fr/logo_edf.png', '2023-07-25 13:39:30.125+00', '235c1fb1-5dbe-4cb6-b18e-78b3554c80af');
INSERT INTO "card" ("id", "title", "category", "index", "enterprise_name", "enterprise_activity", "contract_type", "description", "offer_url", "location", "salary", "job_title", "notation", "color", "is_deleted", "notes", "reminder", "logo_url", "created_at", "user_id") VALUES
('981c26c9-c44a-4ef0-926b-3e38f146f90c', 'Carte Capgemini', 'Mes relances', 1, 'Capgemini', 'IT', 'CDD', 'Développeur React chez Capgemini', 'http://linkedin.com/lien_offre', 'Paris', '60000€ annuels', 'Développeur React', 5, 'green', 'f', 'Bien payé', '2023-08-05 00:00:00+00', 'http://www.capgemini.fr/logo.jpg', '2023-07-25 13:46:32.575+00', '235c1fb1-5dbe-4cb6-b18e-78b3554c80af');
INSERT INTO "card" ("id", "title", "category", "index", "enterprise_name", "enterprise_activity", "contract_type", "description", "offer_url", "location", "salary", "job_title", "notation", "color", "is_deleted", "notes", "reminder", "logo_url", "created_at", "user_id") VALUES
('b0ea2637-cc0b-4774-a5a0-7471ecedf2df', 'Carte Disneyland', 'Mes offres', 0, 'Disney', 'Divertissement', 'CDI', 'Directeur de parc chez Disneyland', 'http://linkedin.com/lien_offre', 'Marne la Vallée', '100000000€ annuels', 'Directeur Disneyland', 5, 'rouge', 'f', 'Mes amis travaillent là-bas', '2023-08-05 00:00:00+00', 'http://www.disney.fr/logo.jpg', '2023-07-25 13:50:51.71+00', '7dbcfb4a-639c-401d-b2a8-0f6d5511fece');

COMMIT;