import React, { useContext } from 'react';
import './student.css';
import { Icon } from '@iconify/react';
import { Context } from '../../../index';
import StudentCalendar from './components/StudentCalendar';
import StudentSchedule from './components/StudentSchedule';
import illustration from '../../home/pictures/Online learning-bro.svg';

const StudentHome: React.FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="student-grid">
      <section className="student-hero-card">
        <div className="student-hero-text">
          <div className="student-hero-title">Учитесь и растите</div>
          <div className="student-hero-sub">Новые занятия уже ждут</div>
        </div>
        <div className="student-hero-art">
          <img src={illustration} alt="Illustration" className="student-hero-illustration" />
        </div>
      </section>

      <section className="student-calendar">
        <StudentCalendar />
      </section>

      <div className="student-courses-group">
        <div className="student-section-title">Мои курсы</div>
        <div className="student-courses">
          {Array.isArray((store.user as any)?.courses) && (store.user as any).courses.length > 0 ? (
            <div className="student-cards">
              <div className="student-card">
                <div className="student-card-title">Frontend базовый</div>
                <div className="student-card-sub">3/10 занятий</div>
              </div>
              <div className="student-card">
                <div className="student-card-title">Python основы</div>
                <div className="student-card-sub">2/8 занятий</div>
              </div>
            </div>
          ) : (
            <div className="student-empty">
              У вас пока нет курсов! Вы можете найти их в разделе «поиск»!
            </div>
          )}
        </div>
      </div>

      <section className="student-schedule-box">
        <StudentSchedule />
      </section>

      <div className="student-tasks-group">
        <div className="student-section-title">Задачи на сегодня</div>
        <div className="student-tasks">
          <div className="student-tasks-list">
            <label className="student-task">
              <div className="student-task-content">
                <span className="student-task-icon-wrapper">
                  <Icon icon="system-uicons:book-text" />
                </span>
                Пройти модуль по JSX
              </div>
              <input type="checkbox" />
            </label>
            <label className="student-task">
              <div className="student-task-content">
                <span className="student-task-icon-wrapper">
                  <Icon icon="system-uicons:book-text" />
                </span>
                Сделать практику по массивам
              </div>
              <input type="checkbox" />
            </label>
            <label className="student-task">
              <div className="student-task-content">
                <span className="student-task-icon-wrapper">
                  <Icon icon="system-uicons:book-text" />
                </span>
                Прочитать статью по Git
              </div>
              <input type="checkbox" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
