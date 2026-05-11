-- Один скрипт: колонки для аватара и расширенного профиля преподавателя.
-- По умолчанию пусто (NULL), пока пользователь не загрузит фото / не заполнит поля.
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS about_me TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS certificates TEXT DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS career TEXT DEFAULT NULL;
