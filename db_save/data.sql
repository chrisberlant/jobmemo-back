INSERT INTO "public"."user" ("email", "first_name", "last_name", "password", "avatar_url", "address") VALUES
('chuck.norris@gmail.com', 'chuck', 'norris', 'azerty', 'chuck.jpg', NULL);
INSERT INTO "public"."user" ("email", "first_name", "last_name", "password", "avatar_url", "address") VALUES
('bruce.lee@free.fr', 'bruce', 'lee', 'qwerty', 'bruce.png', NULL);
INSERT INTO "public"."user" ("email", "first_name", "last_name", "password", "avatar_url", "address") VALUES
('mickey.mouse@sfr.fr', 'Mickey', 'Mouse', 'Minnie', '/img/default_avatar.png', NULL);

INSERT INTO "public"."card" ("title", "category", "index", "enterprise_name", "contract_type", "description", "offer_url", "location", "salary", "job_title", "notation", "color", "is_deleted", "notes", "reminder", "created_at", "user_id", "enterprise_activity", "logo_url") VALUES
('Carte 1', 'Mes offres', 0, 'EDF', 'CDI', 'Offre en CDI pour technicien de maintenance électrique', 'http://linkedin.com/lien_offre', 'Paris', '25.000€ annuels', 'Technicien de maintenance électrique', 3, 'red', 'f', 'Equipement de protection à acheter', '2023-08-04 00:00:00+00', '2023-07-17 00:00:00+00', 1, 'Fournisseur d''énergie', 'EDF.png');
INSERT INTO "public"."card" ("title", "category", "index", "enterprise_name", "contract_type", "description", "offer_url", "location", "salary", "job_title", "notation", "color", "is_deleted", "notes", "reminder", "created_at", "user_id", "enterprise_activity", "logo_url") VALUES
('Carte 2', 'Mes offres', 1, 'Airbus', 'Alternance', 'Offre en alternance de reponsable RH', 'http://indeed.com/lien_offre', 'Toulouse', '900€ par mois', 'Reponsable RH', 1, 'blue', 'f', 'Uniquement si pas d''autre choix', '2023-09-12 00:00:00+00', '2023-07-18 00:00:00+00', 1, 'Aviation', 'Airbus.jpg');
