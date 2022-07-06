CREATE TABLE message(
    id SERIAL primary key,
    text VARCHAR(255),
    created_at TIMESTAMP with time zone,
    updated_at TIMESTAMP with time zone
)

DROP TABLE students;
