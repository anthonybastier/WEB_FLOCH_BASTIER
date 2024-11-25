--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-25 20:20:36

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 20771)
-- Name: joueurs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.joueurs (
    id integer NOT NULL,
    nom character varying(255),
    date timestamp without time zone,
    score integer
);


ALTER TABLE public.joueurs OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 20770)
-- Name: joueurs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.joueurs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.joueurs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 5760 (class 0 OID 20771)
-- Dependencies: 227
-- Data for Name: joueurs; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.joueurs OVERRIDING SYSTEM VALUE VALUES (1, 'GunLoverz77', '2024-11-24 21:06:13.956105', 507);
INSERT INTO public.joueurs OVERRIDING SYSTEM VALUE VALUES (2, 'GPeur', '2024-11-24 21:06:13.956105', 0);
INSERT INTO public.joueurs OVERRIDING SYSTEM VALUE VALUES (3, 'atchoum', '2024-11-24 21:06:13.956105', 519);


--
-- TOC entry 5766 (class 0 OID 0)
-- Dependencies: 226
-- Name: joueurs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.joueurs_id_seq', 3, true);


--
-- TOC entry 5610 (class 2606 OID 20775)
-- Name: joueurs joueurs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.joueurs
    ADD CONSTRAINT joueurs_pkey PRIMARY KEY (id);


-- Completed on 2024-11-25 20:20:36

--
-- PostgreSQL database dump complete
--

