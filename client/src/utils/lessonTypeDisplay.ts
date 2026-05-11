import { Lesson } from '../models/ICourseDetail';

export type LessonTypeValue = Lesson['type'] | string | null | undefined;

export type NormalizedLessonType = 'lecture' | 'assignment' | 'test';

/** Приводит значение с API к одному из трёх типов (без общего «урок»). */
export function normalizeLessonType(type: LessonTypeValue): NormalizedLessonType {
  if (type == null || String(type).trim() === '') {
    return 'lecture';
  }
  const t = String(type).trim().toLowerCase();
  if (t === 'lecture' || t === 'лекция') {
    return 'lecture';
  }
  if (t === 'assignment' || t === 'задание') {
    return 'assignment';
  }
  if (t === 'test' || t === 'тест') {
    return 'test';
  }
  return 'lecture';
}

export function getLessonTypeLabel(type: LessonTypeValue): string {
  switch (normalizeLessonType(type)) {
    case 'lecture':
      return 'Лекция';
    case 'assignment':
      return 'Задание';
    case 'test':
      return 'Тест';
  }
}

export function getLessonTypeIcon(type: LessonTypeValue): string {
  switch (normalizeLessonType(type)) {
    case 'lecture':
      return 'mdi:play-circle-outline';
    case 'assignment':
      return 'mdi:clipboard-text';
    case 'test':
      return 'mdi:format-list-checks';
  }
}
