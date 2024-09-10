-- Write your migration SQL here
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location VARCHAR(255)
);
