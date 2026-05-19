export type SubmissionReviewStatus = 'pending' | 'passed' | 'failed';

export function normalizeReviewStatus(
  value: string | null | undefined
): SubmissionReviewStatus {
  if (value === 'passed' || value === 'failed') return value;
  return 'pending';
}

export function getReviewStatusLabel(status: SubmissionReviewStatus): string {
  switch (status) {
    case 'passed':
      return 'Сдал';
    case 'failed':
      return 'Не сдал';
    default:
      return 'На проверке';
  }
}

export function isSubmissionReviewed(
  reviewStatus: string | null | undefined
): boolean {
  const status = normalizeReviewStatus(reviewStatus);
  return status === 'passed' || status === 'failed';
}

export function partitionSubmissionsByReview<T extends { review_status?: string | null }>(
  submissions: T[]
): { pending: T[]; reviewed: T[] } {
  const pending: T[] = [];
  const reviewed: T[] = [];
  for (const s of submissions) {
    if (isSubmissionReviewed(s.review_status)) {
      reviewed.push(s);
    } else {
      pending.push(s);
    }
  }
  return { pending, reviewed };
}
