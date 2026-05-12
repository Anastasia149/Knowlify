/**
 * Имена файлов в multipart часто приходят как UTF-8, ошибочно прочитанный как Latin-1
 * (каждый байт UTF-8 стал символом U+00xx). Тогда русский текст выглядит как «кракозябры».
 * Если строка уже нормальный Unicode (есть символы > U+00FF), не трогаем.
 */
function decodeMultipartFilename(name) {
    if (!name || typeof name !== 'string') {
        return name;
    }
    const allInLatin1Plane = [...name].every((ch) => ch.codePointAt(0) <= 0xff);
    if (!allInLatin1Plane) {
        return name;
    }
    try {
        const recovered = Buffer.from(name, 'latin1').toString('utf8');
        if (recovered && recovered !== name && !recovered.includes('\uFFFD')) {
            return recovered;
        }
    } catch (_) {
        /* ignore */
    }
    return name;
}

module.exports = { decodeMultipartFilename };
