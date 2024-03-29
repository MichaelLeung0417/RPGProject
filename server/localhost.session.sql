CREATE TABLE accounts
(
  id         SERIAL    NOT NULL,
  username   VARCHAR(255)  UNIQUE,
  password   VARCHAR(255),
  login      BOOLEAN   NOT NULL,
  CHARACTER  VARCHAR(255) UNIQUE,
  LEVEL      INTEGER not NULL,
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

INSERT INTO accounts (username, password, login, CHARACTER, LEVEL, created_at, updated_at) VALUES ('admin',123, FALSE, 'admin1', 1, NOW(), NOW());

INSERT INTO text (messages, created_at, updated_at) VALUES ('hi', NOW(), NOW());

UPDATE accounts SET login = FALSE WHERE username='admin'

SELECT * FROM accounts

SELECT messages FROM text

SELECT * FROM text 

TRUNCATE TABLE text;

TRUNCATE TABLE accounts;

DROP TABLE accounts;
