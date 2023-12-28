BEGIN;

-- Deleting the tables if already existing
DROP TABLE IF EXISTS "user","card","contact","document","card_has_contact","card_has_document" CASCADE;


CREATE TABLE "user" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    email text NOT NULL CHECK (email <> ''),
    first_name text NOT NULL CHECK (first_name <> ''),
    last_name text NOT NULL CHECK (last_name <> ''),
    password text NOT NULL CHECK (password <> ''),
    avatar_url text NOT NULL DEFAULT '/img/default_avatar.png' CHECK (avatar_url <> ''),
    address text DEFAULT ''
);

CREATE TABLE card (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL CHECK (user_id IS NOT NULL),
    title text NOT NULL CHECK (title <> ''),
    category text NOT NULL DEFAULT 'Mes offres' CHECK (category <> ''),
    index int2 NOT NULL DEFAULT 0,
    enterprise_name text NOT NULL DEFAULT 'Nom de l''entreprise' CHECK (enterprise_name <> ''),
    enterprise_activity text DEFAULT '',
    contract_type text NOT NULL DEFAULT 'Autre' CHECK (contract_type <> ''),
    description text DEFAULT '',
    offer_url text DEFAULT '',
    location text DEFAULT '',
    salary text DEFAULT '',
    job_title text DEFAULT '',
    rating int2 NOT NULL DEFAULT 1,
    color text NOT NULL DEFAULT '#fff' CHECK (color <> ''),
    is_deleted bool NOT NULL DEFAULT false,
    comments text DEFAULT '',
    reminder timestamptz,
    logo_url text DEFAULT '',
    created_at timestamptz NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE contact (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL CHECK (user_id IS NOT NULL),
    first_name text NOT NULL CHECK (first_name <> ''),
    last_name text NOT NULL CHECK (last_name <> ''),
    occupation text DEFAULT '',
    email text DEFAULT '',
    phone text DEFAULT '',
    linkedin_profile text DEFAULT '',
    enterprise text DEFAULT '',
    comments text DEFAULT '',
    color text NOT NULL DEFAULT '#fff'  CHECK (color <> ''),
    FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE document (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid NOT NULL CHECK (user_id IS NOT NULL),
    title text NOT NULL DEFAULT 'Nouveau document'  CHECK (title <> ''),
    type text NOT NULL DEFAULT 'Autre' CHECK (type <> ''),
    url text NOT NULL,
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