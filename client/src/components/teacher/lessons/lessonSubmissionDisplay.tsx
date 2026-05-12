import React from 'react';
import { Icon } from '@iconify/react';

export type LessonSubmissionRow = {
  id: number;
  student_id?: number;
  student_name?: string | null;
  type: string;
  content?: string | null;
  created_at: string;
};

function isLikelyImageUrl(url: string): boolean {
  return /\.(jpe?g|png|gif|webp)(\?|#|$)/i.test(url);
}

export function TeacherSubmissionMaterial({ s }: { s: LessonSubmissionRow }) {
  const content = (s.content || '').trim();

  if (s.type === 'completed') {
    return (
      <div className="submission-material-block">
        <p className="submission-material-text">
          Ученик отметил задание как выполненное (без ссылки и файла).
        </p>
      </div>
    );
  }

  if (s.type === 'link' && content) {
    return (
      <div className="submission-material-block">
        <p className="submission-material-label">Отправленная ссылка</p>
        <a
          className="submission-material-link"
          href={content}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </div>
    );
  }

  if (s.type === 'file' && content) {
    return (
      <div className="submission-material-block">
        <p className="submission-material-label">Отправленный файл</p>
        <a
          className="submission-material-file"
          href={content}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon icon="mdi:tray-arrow-down" />
          Открыть или скачать файл
        </a>
        {isLikelyImageUrl(content) && (
          <a
            href={content}
            target="_blank"
            rel="noopener noreferrer"
            className="submission-material-image-wrap"
          >
            <img src={content} alt="Превью работы" className="submission-material-image" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="submission-material-block">
      <p className="submission-material-text muted">Нет данных для отображения.</p>
    </div>
  );
}
