CREATE TABLE users
(
  id         SERIAL    NOT NULL,
  username   VARCHAR(255)  UNIQUE,
  password   VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO users (username,password, created_at,updated_at) VALUES ('admin',123,NOW(),NOw());



SELECT * From users

