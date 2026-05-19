export const DEADLINE_LESSON_TYPES = ['assignment', 'test'] as const;

export function lessonTypeHasDeadline(type: string): boolean {
  return DEADLINE_LESSON_TYPES.includes(type as (typeof DEADLINE_LESSON_TYPES)[number]);
}

export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function deadlineLocalToIso(localValue: string): string | null {
  const trimmed = localValue.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function formatDeadline(iso: string | null | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function isSubmissionOverdue(
  createdAt: string,
  deadline: string | null | undefined
): boolean {
  if (!deadline) return false;
  const submitted = new Date(createdAt);
  const due = new Date(deadline);
  if (Number.isNaN(submitted.getTime()) || Number.isNaN(due.getTime())) return false;
  return submitted.getTime() > due.getTime();
}
