

--- Create a table for the database
CREATE TABLE public.promos
(
    promo_id SERIAL NOT NULL,
    descrip character varying(50) NOT NULL,
    code character varying(50) NOT NULL,
    promo_category character varying(50) NOT NULL,
    starting_date DATE NOT NULL,
    ending_date DATE,
    PRIMARY KEY (promo_id)
);

-- Seed data for promos table
INSERT INTO public.promos (promo_id, descrip, code, promo_category, starting_date) VALUES (1,  'factor_ code', 'YAHUNGRY50', 'Food', '2024-08-18');