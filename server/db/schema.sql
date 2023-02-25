DROP DATABASE IF EXISTS ratingsreviews;
CREATE DATABASE ratingsreviews;

\c ratingsreviews;


CREATE TABLE reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER,
  rating INTEGER,
  date TEXT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT false,
  name VARCHAR(50),

  email VARCHAR(100),
  response TEXT DEFAULT NULL,
  helpfulness INTEGER DEFAULT 0
);

COPY reviews
  FROM '/Users/wooseokjang/Desktop/SDC/review_service/ETL/csv/reviews.csv'
  DELIMITER ',' NULL AS 'null' CSV HEADER;


ALTER SEQUENCE reviews_id_seq RESTART WITH 5774953;

CREATE TABLE photos (
  id SERIAL PRIMARY KEY NOT NULL,
  review_id INTEGER REFERENCES reviews (id) NOT NULL,
  url TEXT
);

COPY photos
  FROM '/Users/wooseokjang/Desktop/SDC/review_service/ETL/csv/reviews_photos.csv'
  DELIMITER ',' NULL AS 'null' CSV HEADER;


ALTER SEQUENCE photos_id_seq RESTART WITH 2742541;

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  name VARCHAR(50)
);

COPY characteristics
  FROM '/Users/wooseokjang/Desktop/SDC/review_service/ETL/csv/characteristics.csv'
  DELIMITER ',' NULL AS 'null' CSV HEADER;


ALTER SEQUENCE characteristics_id_seq RESTART WITH 3347680;

CREATE TABLE characteristics_reviews (
  id SERIAL PRIMARY KEY NOT NULL,
  characteristics_id INTEGER REFERENCES characteristics (id) NOT NULL,
  review_id INTEGER REFERENCES reviews (id) NOT NULL,
  value INTEGER
);

COPY characteristics_reviews
  FROM '/Users/wooseokjang/Desktop/SDC/review_service/ETL/csv/characteristic_reviews.csv'
  DELIMITER ',' NULL AS 'null' CSV HEADER;

ALTER SEQUENCE characteristics_reviews_id_seq RESTART WITH 19327576;