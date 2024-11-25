--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-25 20:28:36

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
-- TOC entry 224 (class 1259 OID 20753)
-- Name: objetbloqueparobjet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objetbloqueparobjet (
    indice character varying(255),
    idbloque integer
)
INHERITS (public.objet);


ALTER TABLE public.objetbloqueparobjet OWNER TO postgres;

--
-- TOC entry 5759 (class 0 OID 20753)
-- Dependencies: 224
-- Data for Name: objetbloqueparobjet; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.objetbloqueparobjet VALUES (13, 'Aéroport', '0101000020E61000002D0B26FE28635940E71BD13DEBFA0840', 'Vous mourrez dans le crash de la Malaysia Airline du 8 mars 2014. (Succès : Comme un avion sans elle) <br> La fuite n''est pas une solution !', 'assets/sprite/airport.png', '{32,32}', 7, false, 'Un titre de transport vous est demandé.', 9);
INSERT INTO public.objetbloqueparobjet VALUES (14, 'Épave du Wilhelm Gustloff', '0101000020E610000029B4ACFBC7623140ABE80FCD3C8D4B40', 'Vous tirez sur le coffre de la vie éternelle avec le pistolet. Il s''ouvre, la vie éternelle s''offre à vous !', 'assets/sprite/shipwreck.png', '{32,32}', 6, false, 'Vous plongez et trouvez le coffre de la vie éternelle fermé, recouvert de hiéroglyphes. RDV au centre de la pyramide.', 8);


-- Completed on 2024-11-25 20:28:36

--
-- PostgreSQL database dump complete
--

