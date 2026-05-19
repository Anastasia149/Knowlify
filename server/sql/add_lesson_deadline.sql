-- Срок сдачи для заданий и тестов (NULL — без ограничения)
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS deadline TIMESTAMPTZ NULL;
