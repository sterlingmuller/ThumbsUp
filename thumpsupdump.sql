--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

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
-- Name: thumbsup; Type: DATABASE; Schema: -; Owner: style
--

CREATE DATABASE thumbsup WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE thumbsup OWNER TO style;

\connect thumbsup

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
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: completed_trips; Type: TABLE; Schema: public; Owner: style
--

CREATE TABLE public.completed_trips (
    id integer NOT NULL,
    id_driver_trips integer,
    user_id integer,
    rator_id integer,
    rating integer
);


ALTER TABLE public.completed_trips OWNER TO style;

--
-- Name: completed_trips_id_seq; Type: SEQUENCE; Schema: public; Owner: style
--

CREATE SEQUENCE public.completed_trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.completed_trips_id_seq OWNER TO style;

--
-- Name: completed_trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: style
--

ALTER SEQUENCE public.completed_trips_id_seq OWNED BY public.completed_trips.id;


--
-- Name: driver_trips; Type: TABLE; Schema: public; Owner: style
--

CREATE TABLE public.driver_trips (
    id integer NOT NULL,
    user_id integer NOT NULL,
    start_address character varying(500) NOT NULL,
    end_address character varying(500) NOT NULL,
    start_time timestamp without time zone NOT NULL,
    completed boolean DEFAULT false
);


ALTER TABLE public.driver_trips OWNER TO style;

--
-- Name: driver_trips_id_seq; Type: SEQUENCE; Schema: public; Owner: style
--

CREATE SEQUENCE public.driver_trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.driver_trips_id_seq OWNER TO style;

--
-- Name: driver_trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: style
--

ALTER SEQUENCE public.driver_trips_id_seq OWNED BY public.driver_trips.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: style
--

CREATE TABLE public.messages (
    message_id integer NOT NULL,
    id_driver_trips integer,
    message_sender integer,
    message_recepient integer,
    message_body character varying(500),
    message_read boolean DEFAULT false,
    message_time timestamp without time zone
);


ALTER TABLE public.messages OWNER TO style;

--
-- Name: messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: style
--

CREATE SEQUENCE public.messages_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_message_id_seq OWNER TO style;

--
-- Name: messages_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: style
--

ALTER SEQUENCE public.messages_message_id_seq OWNED BY public.messages.message_id;


--
-- Name: rider_trips; Type: TABLE; Schema: public; Owner: style
--

CREATE TABLE public.rider_trips (
    id integer NOT NULL,
    user_id integer NOT NULL,
    id_driver_trips integer NOT NULL,
    pending boolean DEFAULT true
);


ALTER TABLE public.rider_trips OWNER TO style;

--
-- Name: rider_trips_id_seq; Type: SEQUENCE; Schema: public; Owner: style
--

CREATE SEQUENCE public.rider_trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rider_trips_id_seq OWNER TO style;

--
-- Name: rider_trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: style
--

ALTER SEQUENCE public.rider_trips_id_seq OWNED BY public.rider_trips.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: style
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    profile_picture character varying(500)
);


ALTER TABLE public.users OWNER TO style;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: style
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO style;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: style
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: completed_trips id; Type: DEFAULT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.completed_trips ALTER COLUMN id SET DEFAULT nextval('public.completed_trips_id_seq'::regclass);


--
-- Name: driver_trips id; Type: DEFAULT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.driver_trips ALTER COLUMN id SET DEFAULT nextval('public.driver_trips_id_seq'::regclass);


--
-- Name: messages message_id; Type: DEFAULT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.messages ALTER COLUMN message_id SET DEFAULT nextval('public.messages_message_id_seq'::regclass);


--
-- Name: rider_trips id; Type: DEFAULT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.rider_trips ALTER COLUMN id SET DEFAULT nextval('public.rider_trips_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: completed_trips; Type: TABLE DATA; Schema: public; Owner: style
--

COPY public.completed_trips (id, id_driver_trips, user_id, rator_id, rating) FROM stdin;
1	1	1	2	3
2	1	1	4	4
3	3	1	5	2
4	5	3	4	3
5	7	3	6	5
\.


--
-- Data for Name: driver_trips; Type: TABLE DATA; Schema: public; Owner: style
--

COPY public.driver_trips (id, user_id, start_address, end_address, start_time, completed) FROM stdin;
1	1	Denver, CO	Fort Collins, CO	2017-06-01 08:30:00	t
3	1	Colorado Springs, CO	Boulder, CO	2017-06-02 08:30:00	t
5	3	Las Vegas NV	Los Angeles, CA	2017-06-02 08:30:00	t
6	3	Orlando FL	Las Vegas NV	2017-06-15 08:30:00	f
7	3	Denver, CO	Phoenix, AZ	2017-06-02 08:30:00	t
8	3	Atlanta, GA	Topeka, KS	2017-06-12 08:30:00	f
9	1	New York, NY, USA	Philadelphia, PA, USA	2022-03-15 14:10:00	f
10	1	New York, NY, USA	Philadelphia, PA, USA	2022-03-17 15:10:00	f
4	1	Fort Collins, CO	Denver, CO	2017-06-12 08:30:00	t
2	1	Denver, CO	Boulder, CO	2017-06-02 08:30:00	t
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: style
--

COPY public.messages (message_id, id_driver_trips, message_sender, message_recepient, message_body, message_read, message_time) FROM stdin;
1	1	2	1	Save me a seat!	f	2017-05-28 08:30:00
2	1	1	2	Will do!	f	2017-05-28 08:30:00
3	1	4	1	Save me a seat!	f	2017-05-28 08:30:00
4	1	1	4	Looking forward to it!	f	2017-05-28 08:30:00
5	2	2	1	Save me a seat!	f	2017-05-28 08:30:00
6	2	1	2	Hello again!	f	2017-05-28 08:30:00
7	3	5	1	Save me a seat!	f	2017-05-28 08:30:00
8	3	1	5	Where do you want me to pick you up?	f	2017-05-28 08:30:00
9	4	6	1	Save me a seat!	f	2017-05-28 08:30:00
10	4	1	6	This is going to be awesome	f	2017-05-28 08:30:00
11	5	4	3	Save me a seat!	f	2017-05-28 08:30:00
12	5	3	4	Cannot wait for this trip	f	2017-05-28 08:30:00
13	6	5	3	Save me a seat!	f	2017-05-28 08:30:00
14	6	3	5	Going to be fun!!	f	2017-05-28 08:30:00
15	7	6	3	Save me a seat!	f	2017-05-28 08:30:00
16	7	3	6	Do you want to stop for tea first	f	2017-05-28 08:30:00
17	8	2	3	Save me a seat!	f	2017-05-28 08:30:00
18	8	3	2	Have you ever been to the city before?	f	2017-05-28 08:30:00
19	7	2	3	Save me a seat!	f	2017-05-28 08:30:00
\.


--
-- Data for Name: rider_trips; Type: TABLE DATA; Schema: public; Owner: style
--

COPY public.rider_trips (id, user_id, id_driver_trips, pending) FROM stdin;
1	2	1	f
2	4	1	f
3	2	2	f
4	5	3	f
5	6	4	f
6	4	5	f
7	5	6	f
8	6	7	f
9	2	8	f
10	2	7	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: style
--

COPY public.users (user_id, username, password, profile_picture) FROM stdin;
1	MrFripple	123	
2	FryGuy	456	
3	MrBean	789	
4	Tony	password	
5	Mark	specialPassword	
6	Stan	P@ssword123	
7	wheelz	bucko	
\.


--
-- Name: completed_trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: style
--

SELECT pg_catalog.setval('public.completed_trips_id_seq', 5, true);


--
-- Name: driver_trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: style
--

SELECT pg_catalog.setval('public.driver_trips_id_seq', 10, true);


--
-- Name: messages_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: style
--

SELECT pg_catalog.setval('public.messages_message_id_seq', 19, true);


--
-- Name: rider_trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: style
--

SELECT pg_catalog.setval('public.rider_trips_id_seq', 10, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: style
--

SELECT pg_catalog.setval('public.users_user_id_seq', 7, true);


--
-- Name: completed_trips completed_trips_pkey; Type: CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.completed_trips
    ADD CONSTRAINT completed_trips_pkey PRIMARY KEY (id);


--
-- Name: driver_trips driver_trips_pkey; Type: CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.driver_trips
    ADD CONSTRAINT driver_trips_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: rider_trips rider_trips_pkey; Type: CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.rider_trips
    ADD CONSTRAINT rider_trips_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: completed_trips completed_trips_id_driver_trips_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.completed_trips
    ADD CONSTRAINT completed_trips_id_driver_trips_fkey FOREIGN KEY (id_driver_trips) REFERENCES public.driver_trips(id);


--
-- Name: completed_trips completed_trips_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.completed_trips
    ADD CONSTRAINT completed_trips_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: driver_trips driver_trips_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.driver_trips
    ADD CONSTRAINT driver_trips_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: messages messages_id_driver_trips_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_id_driver_trips_fkey FOREIGN KEY (id_driver_trips) REFERENCES public.driver_trips(id) ON DELETE CASCADE;


--
-- Name: messages messages_message_recepient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_message_recepient_fkey FOREIGN KEY (message_recepient) REFERENCES public.users(user_id);


--
-- Name: messages messages_message_sender_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_message_sender_fkey FOREIGN KEY (message_sender) REFERENCES public.users(user_id);


--
-- Name: rider_trips rider_trips_id_driver_trips_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.rider_trips
    ADD CONSTRAINT rider_trips_id_driver_trips_fkey FOREIGN KEY (id_driver_trips) REFERENCES public.driver_trips(id) ON DELETE CASCADE;


--
-- Name: rider_trips rider_trips_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: style
--

ALTER TABLE ONLY public.rider_trips
    ADD CONSTRAINT rider_trips_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

