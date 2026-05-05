import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import './TeacherHeader.css';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Context } from '../../../../index';
import { observer } from 'mobx-react-lite';

type Props = {
  name?: string;
};

const TeacherHeader = observer(({ name }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { store } = useContext(Context);

  const userDisplayName = store.user?.name;

  const getTitle = () => {
    const tab = searchParams.get('tab');
    const path = location.pathname;

    if (path.startsWith('/teacher/courses')) return 'Мои курсы';
    if (path.startsWith('/teacher/course/')) return name || 'Детали курса';
    if (path.startsWith('/teacher/create-course')) return 'Создание курса';
    if (path.startsWith('/teacher/lesson/')) return name || 'Урок';
    
    if (tab === 'schedule') return 'Расписание';
    if (tab === 'settings') return 'Настройки';
    if (tab === 'courses') return 'Мои курсы';
    
    return 'Главная';
  };

  const title = getTitle();
  const isHome = title === 'Главная';

  const openSettings = () => navigate('/teacher?tab=settings');
  return (
    <div className="teacher-header">
      <div className="teacher-header-title">
        <div className="teacher-hello">{title}</div>
        {isHome && userDisplayName && (
          <div className="teacher-hello-sub">Добро пожаловать, {userDisplayName}!</div>
        )}
      </div>
      <div className="teacher-header-actions">
        <button className="teacher-icon-btn" aria-label="Поиск">
          <Icon icon="si:search-line" />
        </button>
        <button className="teacher-icon-btn" aria-label="Уведомления">
          <Icon icon="solar:bell-linear" />
        </button>
        <div className="teacher-avatar" onClick={openSettings} role="button" aria-label="Открыть настройки" tabIndex={0}>
          <Icon icon="solar:user-linear" />
        </div>
      </div>
    </div>
  );
});

export default TeacherHeader;
