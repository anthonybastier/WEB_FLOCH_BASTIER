--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-25 20:29:03

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
-- TOC entry 222 (class 1259 OID 20743)
-- Name: objetrecuperable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objetrecuperable (
)
INHERITS (public.objet);


ALTER TABLE public.objetrecuperable OWNER TO postgres;

--
-- TOC entry 5759 (class 0 OID 20743)
-- Dependencies: 222
-- Data for Name: objetrecuperable; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.objetrecuperable VALUES (8, 'Pistolet', '0101000020E61000008BE1EA00085A60405A9C31CC09CE39C0', 'Rendez-vous dans la main de la Liberté', 'assets/sprite/gun.png', '{32,32}', 6, true);
INSERT INTO public.objetrecuperable VALUES (9, 'Billet d''avion', '0101000020E61000008BE1EA0008BA604021E868554BCE39C0', 'Billet au départ de Kuala Lumpur', 'assets/sprite/plane_ticket.png', '{32,32}', 6, true);
INSERT INTO public.objetrecuperable VALUES (10, 'Mouchoir', '0101000020E61000008BE1EA00081A6140E833A0DE8CCE39C0', 'Rendez-vous dans le lieu le plus radioactif de la planète', 'assets/sprite/tissue.png', '{32,32}', 6, true);


-- Completed on 2024-11-25 20:29:03

--
-- PostgreSQL database dump complete
--

