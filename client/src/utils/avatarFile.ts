const MIME_JPEG = 'image/jpeg';
const MIME_PNG = 'image/png';

/** Сообщение об ошибке или null, если файл подходит под JPG/PNG */
export function getAvatarFileTypeError(file: File): string | null {
  const mime = (file.type || '').toLowerCase().trim();
  if (mime === MIME_JPEG || mime === MIME_PNG) {
    return null;
  }
  if (mime === 'image/jpg') {
    return null;
  }
  const ext = file.name.split('.').pop()?.toLowerCase();
  if (!mime && (ext === 'jpg' || ext === 'jpeg' || ext === 'png')) {
    return null;
  }
  return 'Допустимы только файлы JPG или PNG.';
}
