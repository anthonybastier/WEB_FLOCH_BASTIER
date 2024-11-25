--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-25 20:20:48

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
-- TOC entry 221 (class 1259 OID 20736)
-- Name: objet; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objet (
    id integer NOT NULL,
    nom character varying(255),
    point public.geometry(Point,4326),
    description character varying(255),
    url_icone character varying(255),
    taille_icone numeric[],
    minzoomvisible integer,
    depart boolean
);


ALTER TABLE public.objet OWNER TO postgres;

--
-- TOC entry 5759 (class 0 OID 20736)
-- Dependencies: 221
-- Data for Name: objet; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.objet VALUES (1, 'Statue de la Liberté', '0101000020E6100000A208A9DBD98252C0EAD0E97937584440', 'Vous cherchez à vous protéger ? Mon petit doigt me dit qu''on peut trouver la vie éternelle dans le lieu du naufrage le plus meurtrier.', 'assets/sprite/liberty_statue.png', '{32,32}', 12, false);
INSERT INTO public.objet VALUES (2, 'Pyramide du Louvre', '0101000020E61000008FE4F21FD2AF02403E93FDF3346E4840', 'Une tortue tombée du ciel vous éclate le crâne et vous mourrez sur le coup. (Succès : Eschyle le Grec) <br> Mauvaise pyramide !', 'assets/sprite/louvre_pyramide.png', '{32,32}', 14, false);
INSERT INTO public.objet VALUES (3, 'Pyramide de Khéops', '0101000020E61000009B560A815C223F40AE282504ABFA3D40', 'Vous perdez votre temps ici… Pourquoi ne pas utiliser votre pistolet sur le coffre ?', 'assets/sprite/pyramid.png', '{32,32}', 7, false);
INSERT INTO public.objet VALUES (4, 'Centrale nucléaire de Fukushima', '0101000020E610000037C64E7809A16140BBD23252EFB54240', 'La vague de 2011 vous emporte, vous mourrez. (Succès : bu la tasse) <br> Fukushima n''est pas le lieu le plus radioactif de la planète !', 'assets/sprite/Fukushima.png', '{32,32}', 7, false);
INSERT INTO public.objet VALUES (5, 'Tours jumelles à NYC', '0101000020E6100000EB1C03B2D78052C0BADBF5D2145B4440', 'Vous mourrez dans le crash des tours jumelles. (Succès : 9/11)', 'assets/sprite/twin_towers.png', '{32,32}', 12, false);
INSERT INTO public.objet VALUES (6, 'Vésuve à Pompéi', '0101000020E61000000AD7A3703DDA2C4036C98FF815694440', 'Vous mourrez carbonisé, une statue de vous restera sur place néanmoins ! (Succès : Pline l''ancien) <br> L''éruption du Vésuve ne fut pas la plus meurtrière !', 'assets/sprite/vesuve.png', '{32,32}', 7, false);
INSERT INTO public.objet VALUES (7, 'Épave du Titanic', '0101000020E6100000B39597FC4FE248C012DC48D922F14440', 'Vous plongez et trouvez dans la salle du commandant de bord un indice gravé. <br> <strong> Indice : </strong> Rendez-vous en haut d''une tour du WTC', 'assets/sprite/shipwreck.png', '{32,32}', 6, false);
INSERT INTO public.objet VALUES (11, 'Volcan Tambora', '0101000020E6100000AB92C83EC87F5D40ACC5A700187F20C0', 'Quelle chance ! Le volcan semble calme. Bizarre, il y a un code avec votre nom dessus.', 'assets/sprite/Tambora.png', '{32,32}', 5, false);


--
-- TOC entry 5610 (class 2606 OID 20742)
-- Name: objet objet_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objet
    ADD CONSTRAINT objet_pkey PRIMARY KEY (id);


-- Completed on 2024-11-25 20:20:49

--
-- PostgreSQL database dump complete
--

