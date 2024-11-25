--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-25 20:21:09

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
-- TOC entry 225 (class 1259 OID 20758)
-- Name: objetbloqueparcode; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objetbloqueparcode (
)
INHERITS (public.objetbloqueparobjet);


ALTER TABLE public.objetbloqueparcode OWNER TO postgres;

--
-- TOC entry 5757 (class 0 OID 20758)
-- Dependencies: 225
-- Data for Name: objetbloqueparcode; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.objetbloqueparcode VALUES (12, 'Centrale nucléaire de Pripiat', '0101000020E61000000DDE57E542193E40C3F17C06D4B14940', 'Attention à ne rien toucher… Vous trouvez une boîte fermée par un cadenas à code, recouverte de cendres.', 'assets/sprite/tchernobyl.png', '{32,32}', 6, false, 'Code dans le lieu de la pire éruption volcanique', 11);


-- Completed on 2024-11-25 20:21:09

--
-- PostgreSQL database dump complete
--

