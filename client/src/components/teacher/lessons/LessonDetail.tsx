import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import { Lesson } from '../../../models/ICourseDetail';
import TeacherSidebar from '../dashboard/components/TeacherSidebar';
import TeacherHeader from '../dashboard/components/TeacherHeader';
import { Icon } from '@iconify/react';
import '../dashboard/TeacherLayout.css';
import '../courses/CreateLesson.css';
import { TeacherSubmissionMaterial, LessonSubmissionRow } from './lessonSubmissionDisplay';

const LessonDetail: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [submissions, setSubmissions] = useState<LessonSubmissionRow[]>([]);
  const [activeTab, setActiveTab] = useState('materials');

  useEffect(() => {
    if (!lessonId) return;
    store.getLesson(lessonId).then((data) => {
      setLesson(data || null);
      if (data?.type === 'test') {
        setActiveTab((tab) => (tab === 'materials' ? 'students' : tab));
      }
    });
  }, [lessonId, store]);

  useEffect(() => {
    if (!lessonId || !lesson) return;
    if (lesson.type === 'assignment' || lesson.type === 'test') {
      store.getLessonSubmissions(lessonId).then((subs) => {
        setSubmissions(Array.isArray(subs) ? subs : []);
      });
    } else {
      setSubmissions([]);
    }
  }, [lessonId, lesson, store]);

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить этот урок?')) {
      if (lessonId) {
        await store.deleteLesson(lessonId);
        navigate(`/teacher/course/${lesson?.course_id}`);
      }
    }
  };

  const studentsTabLabel =
    lesson?.type === 'assignment' && submissions.length > 0
      ? `Работы учеников (${submissions.length})`
      : 'Работы учеников';

  return (
    <div className="teacher-layout">
      <TeacherSidebar />
      <main className="teacher-content">
        <TeacherHeader name={lesson?.title || 'Урок'} />
        <div className="teacher-courses-page">
          {!lesson ? (
            <div>Загрузка...</div>
          ) : (
            <>
              <h1>{lesson.title}</h1>


              <div className="lesson-detail-tabs">
                {lesson.type !== 'test' && (
                  <button
                    type="button"
                    className={`tab-button ${activeTab === 'materials' ? 'active' : ''}`}
                    onClick={() => setActiveTab('materials')}
                  >
                    Материалы
                  </button>
                )}
                <button
                  type="button"
                  className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveTab('students')}
                >
                  {studentsTabLabel}
                </button>
                <button
                  type="button"
                  className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Настройки урока
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'students' && (
                  <div className="students-tab">
                    {lesson.type === 'lecture' ? (
                      <p className="info-text">Для лекций не предусмотрена сдача работ.</p>
                    ) : (
                      <>
                        <p className="students-tab-intro">
                          {lesson.type === 'assignment'
                            ? 'Здесь отображаются ученики, которые отправили работу по этому заданию, и то, что они прикрепили.'
                            : 'Ответы учеников по этому уроку (если предусмотрены).'}
                        </p>
                        <div className="submissions-list">
                          {submissions.length === 0 ? (
                            <p className="info-text">Работ пока никто не отправил.</p>
                          ) : (
                            submissions.map((s) => (
                              <div key={s.id} className="submission-item submission-item--card">
                                <div className="submission-item-header">
                                  <div className="submission-user">
                                    <Icon icon="solar:user-circle-linear" />
                                    <span>{s.student_name || 'Ученик'}</span>
                                  </div>
                                  <span className="submission-status-pill">Сдал работу</span>
                                  <div className="submission-date">
                                    {new Date(s.created_at).toLocaleString('ru-RU')}
                                  </div>
                                </div>
                                <TeacherSubmissionMaterial s={s} />
                              </div>
                            ))
                          )}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeTab === 'materials' && lesson.type !== 'test' && (
                  <div className="materials-tab">
                    {lesson.materials.length === 0 ? (
                      <p>Материалов пока нет.</p>
                    ) : (
                      <div className="materials-grid">
                        {lesson.materials.map((m) => (
                          <a
                            key={m.id}
                            href={m.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="material-card"
                          >
                            <Icon icon="mdi:file-document-outline" />
                            <span>{m.title}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="lesson-settings-tab">
                    <button
                      type="button"
                      className="lesson-action-btn edit"
                      onClick={() => navigate(`/teacher/lesson/${lessonId}/edit`)}
                    >
                      Редактировать урок
                    </button>
                    <button type="button" className="lesson-action-btn delete" onClick={handleDelete}>
                      Удалить урок
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default observer(LessonDetail);
