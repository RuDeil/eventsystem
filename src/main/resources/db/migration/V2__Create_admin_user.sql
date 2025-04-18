INSERT INTO users (full_name, username, password, role)
VALUES ('Администратор', 'admin', '$2a$12$.0zN.kb4mDFBge23U3ZwqOnpXlp61jXWzuEEEK045lFMdnXhYqibC', 'ADMIN')
ON CONFLICT (username) DO NOTHING;