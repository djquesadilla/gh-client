-- Write your migration SQL here
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  login VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  location VARCHAR(255)
);
