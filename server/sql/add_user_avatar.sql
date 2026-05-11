-- Один раз к вашей БД. Новые пользователи без фото: значение по умолчанию NULL.
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT NULL;
