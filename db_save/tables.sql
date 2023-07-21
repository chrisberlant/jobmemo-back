--
-- PostgreSQL database dump
--

-- Dumped from database version 14.7 (Ubuntu 14.7-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 15.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: card; Type: TABLE; Schema: public; Owner: jobmemo
--

CREATE TABLE public.card (
    id integer NOT NULL,
    title text DEFAULT 'Titre de la fiche'::text NOT NULL,
    category text DEFAULT 'Mes offres'::text NOT NULL,
    index integer DEFAULT 0 NOT NULL,
    enterprise_name text DEFAULT 'Nom de l''entreprise'::text NOT NULL,
    enterprise_activity text,
    contract_type text DEFAULT 'Autre'::text NOT NULL,
    description text,
    offer_url text,
    location text,
    salary text,
    job_title text,
    notation integer DEFAULT 1 NOT NULL,
    color text DEFAULT '#fff'::text NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    notes text,
    reminder timestamp with time zone,
    logo_url text,
    created_at timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.card OWNER TO jobmemo;

--
-- Name: card_has_contact; Type: TABLE; Schema: public; Owner: jobmemo
--

CREATE TABLE public.card_has_contact (
    card_id integer NOT NULL,
    contact_id integer NOT NULL
);


ALTER TABLE public.card_has_contact OWNER TO jobmemo;

--
-- Name: card_has_document; Type: TABLE; Schema: public; Owner: jobmemo
--

CREATE TABLE public.card_has_document (
    card_id integer NOT NULL,
    document_id integer NOT NULL
);


ALTER TABLE public.card_has_document OWNER TO jobmemo;

--
-- Name: card_id_seq; Type: SEQUENCE; Schema: public; Owner: jobmemo
--

CREATE SEQUENCE public.card_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.card_id_seq OWNER TO jobmemo;

--
-- Name: card_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jobmemo
--

ALTER SEQUENCE public.card_id_seq OWNED BY public.card.id;


--
-- Name: contact; Type: TABLE; Schema: public; Owner: jobmemo
--

CREATE TABLE public.contact (
    id integer NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    occupation text,
    email text,
    phone text,
    linkedin_profile text,
    enterprise text,
    comments text,
    color text DEFAULT '#fff'::text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.contact OWNER TO jobmemo;

--
-- Name: contact_id_seq; Type: SEQUENCE; Schema: public; Owner: jobmemo
--

CREATE SEQUENCE public.contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_id_seq OWNER TO jobmemo;

--
-- Name: contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jobmemo
--

ALTER SEQUENCE public.contact_id_seq OWNED BY public.contact.id;


--
-- Name: document; Type: TABLE; Schema: public; Owner: jobmemo
--

CREATE TABLE public.document (
    id integer NOT NULL,
    title text DEFAULT 'Nouveau document'::text NOT NULL,
    type text DEFAULT 'Autre'::text NOT NULL,
    url text DEFAULT ''::text NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.document OWNER TO jobmemo;

--
-- Name: document_id_seq; Type: SEQUENCE; Schema: public; Owner: jobmemo
--

CREATE SEQUENCE public.document_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.document_id_seq OWNER TO jobmemo;

--
-- Name: document_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jobmemo
--

ALTER SEQUENCE public.document_id_seq OWNED BY public.document.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: jobmemo
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email text NOT NULL,
    first_name text NOT NULL,
    last_name text NOT NULL,
    password text NOT NULL,
    avatar_url text DEFAULT '/img/default_avatar.png'::text NOT NULL
);


ALTER TABLE public."user" OWNER TO jobmemo;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: jobmemo
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO jobmemo;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jobmemo
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: card id; Type: DEFAULT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card ALTER COLUMN id SET DEFAULT nextval('public.card_id_seq'::regclass);


--
-- Name: contact id; Type: DEFAULT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.contact ALTER COLUMN id SET DEFAULT nextval('public.contact_id_seq'::regclass);


--
-- Name: document id; Type: DEFAULT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.document ALTER COLUMN id SET DEFAULT nextval('public.document_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: card_has_contact card_has_contact_pkey; Type: CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card_has_contact
    ADD CONSTRAINT card_has_contact_pkey PRIMARY KEY (card_id, contact_id);


--
-- Name: card_has_document card_has_document_pkey; Type: CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card_has_document
    ADD CONSTRAINT card_has_document_pkey PRIMARY KEY (card_id, document_id);


--
-- Name: card card_pkey; Type: CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_pkey PRIMARY KEY (id);


--
-- Name: contact contact_pkey; Type: CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (id);


--
-- Name: document document_pkey; Type: CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: card_has_contact card_has_contact_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card_has_contact
    ADD CONSTRAINT card_has_contact_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: card_has_contact card_has_contact_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card_has_contact
    ADD CONSTRAINT card_has_contact_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contact(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: card_has_document card_has_document_card_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card_has_document
    ADD CONSTRAINT card_has_document_card_id_fkey FOREIGN KEY (card_id) REFERENCES public.card(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: card_has_document card_has_document_document_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card_has_document
    ADD CONSTRAINT card_has_document_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.document(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: card card_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.card
    ADD CONSTRAINT card_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: contact contact_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: document document_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: jobmemo
--

ALTER TABLE ONLY public.document
    ADD CONSTRAINT document_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

