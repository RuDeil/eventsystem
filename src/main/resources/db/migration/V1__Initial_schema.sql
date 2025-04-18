-- V1__Initial_schema.sql
CREATE TYPE event_category AS ENUM (
    'CONFERENCE', 'WORKSHOP', 'MEETUP', 'OTHER'
);
CREATE TYPE event_format AS ENUM ('OFFLINE', 'ONLINE', 'HYBRID');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('USER', 'ADMIN')),
    username VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    category event_category NOT NULL,
    format event_format NOT NULL,
    location VARCHAR(200),
    online_link TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    max_participants INT,
    is_cancellable BOOLEAN DEFAULT TRUE,
    created_by INT REFERENCES users(id) NOT NULL,
    status VARCHAR(20) DEFAULT 'OPEN' CHECK (
        status IN ('DRAFT', 'PLANNED', 'OPEN', 'ACTIVE', 'COMPLETED')
    )
);