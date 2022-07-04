CREATE TABLE users
(
  id         SERIAL    NOT NULL,
  username   VARCHAR(255)  UNIQUE,
  password   VARCHAR(255),
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO students (username, password, created_at, updated_at) VALUES ('admin',123, NOW(), NOW());

SELECT * FROM users