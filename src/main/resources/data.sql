-- Insert admin user
INSERT INTO users (full_name, username, password, role)
VALUES ('Admin User', 'admin', '$2a$10$xLFtBIXGtYvAbRqM1JpqJOqQZdAS4WmJRlKvYd1B4F.lG6f/4Zz1K', 'ADMIN');

-- Insert regular user
INSERT INTO users (full_name, username, password)
VALUES ('Regular User', 'user', '$2a$10$xLFtBIXGtYvAbRqM1JpqJOqQZdAS4WmJRlKvYd1B4F.lG6f/4Zz1K');