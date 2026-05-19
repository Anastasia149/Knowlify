import React from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const LessonDeadlineField: React.FC<Props> = ({ value, onChange }) => (
  <div className="form-group full-width">
    <label htmlFor="lesson-deadline">Срок сдачи</label>
    <input
      type="datetime-local"
      id="lesson-deadline"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    <p className="form-hint">
      Необязательно. Если студент сдаст работу после этого времени, она будет отмечена как
      просроченная.
    </p>
  </div>
);
