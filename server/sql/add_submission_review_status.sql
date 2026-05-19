-- Статус проверки домашней работы преподавателем: pending | passed | failed
ALTER TABLE submissions
  ADD COLUMN IF NOT EXISTS review_status VARCHAR(20) NOT NULL DEFAULT 'pending';
