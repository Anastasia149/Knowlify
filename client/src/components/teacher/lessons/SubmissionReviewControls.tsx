import React, { useState } from 'react';
import {
  getReviewStatusLabel,
  normalizeReviewStatus,
} from '../../../utils/submissionReview';

type Props = {
  submissionId: number;
  reviewStatus: string | null | undefined;
  onReview: (submissionId: number, status: 'passed' | 'failed') => Promise<boolean>;
};

export const SubmissionReviewControls: React.FC<Props> = ({
  submissionId,
  reviewStatus,
  onReview,
}) => {
  const status = normalizeReviewStatus(reviewStatus);
  const [saving, setSaving] = useState<'passed' | 'failed' | null>(null);

  const handleReview = async (next: 'passed' | 'failed') => {
    if (saving) return;
    setSaving(next);
    try {
      await onReview(submissionId, next);
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="submission-review">
      <span className={`submission-review-pill submission-review-pill--${status}`}>
        {getReviewStatusLabel(status)}
      </span>
      <div className="submission-review-actions">
        <button
          type="button"
          className={`submission-review-btn passed${status === 'passed' ? ' active' : ''}`}
          onClick={() => handleReview('passed')}
          disabled={!!saving}
        >
          {saving === 'passed' ? '…' : 'Сдал'}
        </button>
        <button
          type="button"
          className={`submission-review-btn failed${status === 'failed' ? ' active' : ''}`}
          onClick={() => handleReview('failed')}
          disabled={!!saving}
        >
          {saving === 'failed' ? '…' : 'Не сдал'}
        </button>
      </div>
    </div>
  );
};
