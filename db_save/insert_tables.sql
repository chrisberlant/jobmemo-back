BEGIN;

-- Deleting the tables if already existing
DROP TABLE IF EXISTS "user","card","contact","document","card_has_contact","card_has_document" CASCADE;


CREATE TABLE "user" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    avatar_url text NOT NULL DEFAULT '/img/default_avatar.png',
    address text
);

CREATE TABLE card (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    title text NOT NULL DEFAULT 'Titre de la fiche',
    category text NOT NULL DEFAULT 'Mes offres',
    index int2 NOT NULL DEFAULT 0,
    enterprise_name text NOT NULL DEFAULT 'Nom de l''entreprise',
    enterprise_activity text,
    contract_type text NOT NULL DEFAULT 'Autre',
    description text,
    offer_url text,
    location text,
    salary text,
    job_title text,
    notation int2 NOT NULL DEFAULT 1,
    color text NOT NULL DEFAULT '#fff',
    is_deleted bool NOT NULL DEFAULT false,
    notes text,
    reminder timestamptz,
    logo_url text,
    created_at timestamptz NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE contact (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    occupation text,
    email text,
    phone text,
    linkedin_profile text,
    enterprise text,
    comments text,
    color text NOT NULL DEFAULT '#fff',
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE document (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL,
    title text NOT NULL DEFAULT 'Nouveau document',
    type text NOT NULL DEFAULT 'Autre',
    url text NOT NULL DEFAULT '',
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE card_has_contact (
    card_id uuid NOT NULL,
    contact_id uuid NOT NULL,
    FOREIGN KEY (card_id) REFERENCES card(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (contact_id) REFERENCES contact(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (card_id, contact_id)
);

CREATE TABLE card_has_document (
    card_id uuid NOT NULL,
    document_id uuid NOT NULL,
    FOREIGN KEY (card_id) REFERENCES card(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (document_id) REFERENCES document(id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (card_id, document_id)
);

COMMIT;