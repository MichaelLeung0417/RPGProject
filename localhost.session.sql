CREATE TABLE accounts
(
  id         SERIAL    NOT NULL,
  username   VARCHAR(255)  UNIQUE,
  password   VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE text
(
  id         SERIAL    NOT NULL,
  messages   VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO accounts (username, password, created_at, updated_at) VALUES ('admin',123, NOW(), NOW());

INSERT INTO text (messages, created_at, updated_at) VALUES ('hi', NOW(), NOW());

SELECT * FROM accounts

SELECT messages FROM text

SELECT * FROM text 

TRUNCATE TABLE text;
