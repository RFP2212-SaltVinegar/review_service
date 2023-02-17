DROP DATABASE IF EXISTS ratingsreviews;
CREATE DATABASE ratingsreviews;

\c ratingsreviews;

CREATE TABLE reviews(
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER,
  rating INTEGER,
  summary TEXT,
  recommend BOOLEAN,
  body TEXT,
  name VARCHAR(50),
  email VARCHAR(100)
);

CREATE TABLE photos(
  id INTEGER PRIMARY KEY NOT NULL,
  url TEXT
);

CREATE TABLE characteristics(
  id INTEGER PRIMARY KEY NOT NULL,
  product_id INTEGER NOT NULL,
  description VARCHAR(50)
);

CREATE TABLE characteristics_reviews(
  id INTEGER PRIMARY KEY NOT NULL,
  review_id INTEGER REFERENCES reviews (id) NOT NULL,
  characteristics_id INTEGER REFERENCES characteristics (id) NOT NULL,
  rating INTEGER
);