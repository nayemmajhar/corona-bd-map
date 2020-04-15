CREATE TABLE divisions (
    id SERIAL PRIMARY KEY,
    title character varying NOT NULL,
    website character varying(255) NOT NULL,
    flag smallint NOT NULL DEFAULT 1
);


CREATE TABLE districts (
    id SERIAL PRIMARY KEY,
    division_id integer NOT NULL REFERENCES divisions(id),
    title character varying NOT NULL,
    website character varying(255) NOT NULL,
    flag smallint NOT NULL DEFAULT 1
);

CREATE TABLE daily_report_division(
    id SERIAL PRIMARY KEY,
    daydate DATE NOT NULL,
    division_id integer NOT NULL REFERENCES divisions(id),
    infected integer NOT NULL DEFAULT 0,
    recovered integer NOT NULL DEFAULT 0,
    death integer NOT NULL DEFAULT 0,
    create_at timestamp without time zone NOT NULL DEFAULT now(),
    modified_on timestamp without time zone NOT NULL DEFAULT now(),
    flag smallint NOT NULL DEFAULT 1
);

CREATE TABLE daily_report_districts(
    id SERIAL PRIMARY KEY,
    daydate DATE NOT NULL,
    district_id integer NOT NULL REFERENCES districts(id),
    division_id integer NOT NULL REFERENCES divisions(id),
    infected integer NOT NULL DEFAULT 0,
    recovered integer NOT NULL DEFAULT 0,
    death integer NOT NULL DEFAULT 0,
    create_at timestamp without time zone NOT NULL DEFAULT now(),
    modified_on timestamp without time zone NOT NULL DEFAULT now(),
    flag smallint NOT NULL DEFAULT 1
);

CREATE TABLE daily_report_overall(
    id SERIAL PRIMARY KEY,
    daydate DATE NOT NULL,
    infected integer NOT NULL DEFAULT 0,
    recovered integer NOT NULL DEFAULT 0,
    death integer NOT NULL DEFAULT 0,
    create_at timestamp without time zone NOT NULL DEFAULT now(),
    modified_on timestamp without time zone NOT NULL DEFAULT now(),
    flag smallint NOT NULL DEFAULT 1
);


CREATE TABLE page(
    id SERIAL PRIMARY KEY,
    daydate DATE NOT NULL,
    infected integer NOT NULL DEFAULT 0,
    recovered integer NOT NULL DEFAULT 0,
    death integer NOT NULL DEFAULT 0,
    create_at timestamp without time zone NOT NULL DEFAULT now(),
    modified_on timestamp without time zone NOT NULL DEFAULT now(),
    flag smallint NOT NULL DEFAULT 1
);



