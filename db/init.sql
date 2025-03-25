-- Создаём типы для категорий и форматов
CREATE TYPE event_category AS ENUM (
    'entertainment', 'educational', 'business', 'cultural'
);
CREATE TYPE event_format AS ENUM ('offline', 'online', 'hybrid');

-- Таблица пользователей
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) CHECK (role IN ('client', 'admin'))
);

-- Таблица мероприятий
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
    status VARCHAR(20) DEFAULT 'planned' CHECK (
        status IN ('planned', 'booked', 'cancelled', 'completed')
);