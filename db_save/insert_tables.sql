BEGIN;

-- Deleting the tables if already existing
DROP TABLE IF EXISTS "user","card","contact","document","card_has_contact","card_has_document" CASCADE;

--  Creating the tables
CREATE TABLE "user" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "email" text NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "password" text NOT NULL,
    "avatar_url" text NOT NULL DEFAULT '/img/default_avatar.png'::text,
    "address" text
);

CREATE TABLE "card" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "title" text NOT NULL DEFAULT 'Titre de la fiche'::text,
    "category" text NOT NULL DEFAULT 'Mes offres'::text,
    "index" int2 NOT NULL DEFAULT 0,
    "enterprise_name" text NOT NULL DEFAULT 'Nom de l''entreprise'::text,
    "enterprise_activity" text,
    "contract_type" text NOT NULL DEFAULT 'Autre'::text,
    "description" text,
    "offer_url" text,
    "location" text,
    "salary" text,
    "job_title" text,
    "notation" int2 NOT NULL DEFAULT 1,
    "color" text NOT NULL DEFAULT '#fff'::text,
    "is_deleted" bool NOT NULL DEFAULT false,
    "notes" text,
    "reminder" timestamptz,
    "logo_url" text,
    "created_at" timestamptz NOT NULL,
    "user_id" uuid NOT NULL,
    CONSTRAINT "card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "contact" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "occupation" text,
    "email" text,
    "phone" text,
    "linkedin_profile" text,
    "enterprise" text,
    "comments" text,
    "color" text NOT NULL DEFAULT '#fff'::text,
    "user_id" uuid NOT NULL,
    CONSTRAINT "contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "document" (
    "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "title" text NOT NULL DEFAULT 'Nouveau document'::text,
    "type" text NOT NULL DEFAULT 'Autre'::text,
    "url" text NOT NULL DEFAULT ''::text,
    "user_id" uuid NOT NULL,
    CONSTRAINT "document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE "card_has_contact" (
    "card_id" uuid NOT NULL,
    "contact_id" uuid NOT NULL,
    CONSTRAINT "card_has_contact_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "card_has_contact_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "contact"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("card_id","contact_id")
);

CREATE TABLE "card_has_document" (
    "card_id" uuid NOT NULL,
    "document_id" uuid NOT NULL,
    CONSTRAINT "card_has_document_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "card"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "card_has_document_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY ("card_id","document_id")
);

COMMIT;


