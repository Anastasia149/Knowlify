import React, { useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Context } from '../../index';
import { observer } from 'mobx-react-lite';
import { ICourse } from '../../models/ICourse';
import { useNavigate } from 'react-router-dom';

const HomeTracks: React.FC = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    store.getAllCourses();
  }, [store]);

  const formatPrice = (price: number | string) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    if (!numPrice || numPrice === 0) return 'Бесплатно';
    return `${numPrice.toLocaleString('ru-RU')} BYN`;
  };

  const formatStudents = (count?: number) => {
    if (!count) return '0';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <section className="home-tracks">
      <div className="home-features-grid">
        <div className="home-feature-item">
          <div className="home-feature-title-box">Курсы</div>
          <p className="home-feature-description">
            Приходите на бесплатные курсы. Поработайте руками — напишите код или протестируйте сайт. Это поможет определиться с дальнейшей карьерой
          </p>
        </div>
        <div className="home-feature-item">
          <div className="home-feature-title-box">Тесты</div>
          <p className="home-feature-description">
            Проверьте себя с помощью бесплатных тестов. Узнайте, как хорошо вы разбираетесь в Data Science и сможете ли обмануть нейросеть
          </p>
        </div>
        <div className="home-feature-item">
          <div className="home-feature-title-box">Интенсивы</div>
          <p className="home-feature-description">
            Примите участие в бесплатных интенсивах. Это отличная возможность попробовать себя в новой профессии и решить, подходит ли она вам
          </p>
        </div>
      </div>

      <h2 className="home-section-title">Самые популярные онлайн-курсы</h2>
      
      {store.courses.length === 0 ? (
        <div className="home-no-courses">Загрузка популярных курсов...</div>
      ) : (
        <div className="home-track-grid">
          {store.courses.slice(0, 8).map((course: ICourse) => (
            <div 
              className="home-course-card" 
              key={course.id}
              onClick={() => navigate('/register')}
            >
              <div className="home-course-image-wrapper">
                <img src={course.image_url || 'https://via.placeholder.com/300x180'} alt={course.title} className="home-course-image" />
                <button className="home-course-favorite">
                  <Icon icon="mdi:heart-outline" />
                </button>
              </div>
              
              <div className="home-course-content">
                <h3 className="home-course-title">{course.title}</h3>
                <div className="home-course-author">{course.author_name || 'Инструктор'}</div>
                
                <div className="home-course-stats">
                  <div className="home-course-rating">
                    <Icon icon="mdi:star" className="star-icon" />
                    <span>4.9</span>
                  </div>
                  <div className="home-course-students">
                    <Icon icon="mdi:account-outline" />
                    <span>{formatStudents(course.students_count)}</span>
                  </div>
                  <div className="home-course-duration">
                    <Icon icon="mdi:clock-outline" />
                    <span>12 ч</span>
                  </div>
                </div>
                
                <div className="home-course-footer">
                  <div className="home-course-price">{formatPrice(course.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="home-section-title" style={{ marginTop: '64px' }}>Бесплатные курсы</h2>
      
      {store.courses.filter((c: ICourse) => {
        const price = typeof c.price === 'string' ? parseFloat(c.price) : c.price;
        return !price || price === 0;
      }).length === 0 ? (
        <div className="home-no-courses">Нет доступных бесплатных курсов</div>
      ) : (
        <div className="home-track-grid">
          {store.courses
            .filter((c: ICourse) => {
              const price = typeof c.price === 'string' ? parseFloat(c.price) : c.price;
              return !price || price === 0;
            })
            .slice(0, 4)
            .map((course: ICourse) => (
              <div 
                className="home-course-card" 
                key={`free-${course.id}`}
                onClick={() => navigate('/register')}
              >
                <div className="home-course-image-wrapper">
                  <img src={course.image_url || 'https://via.placeholder.com/300x180'} alt={course.title} className="home-course-image" />
                  <button className="home-course-favorite">
                    <Icon icon="mdi:heart-outline" />
                  </button>
                </div>
                
                <div className="home-course-content">
                  <h3 className="home-course-title">{course.title}</h3>
                  <div className="home-course-author">{course.author_name || 'Инструктор'}</div>
                  
                  <div className="home-course-stats">
                    <div className="home-course-rating">
                      <Icon icon="mdi:star" className="star-icon" />
                      <span>4.9</span>
                    </div>
                    <div className="home-course-students">
                      <Icon icon="mdi:account-outline" />
                      <span>{formatStudents(course.students_count)}</span>
                    </div>
                    <div className="home-course-duration">
                      <Icon icon="mdi:clock-outline" />
                      <span>12 ч</span>
                    </div>
                  </div>
                  
                  <div className="home-course-footer">
                    <div className="home-course-price">{formatPrice(course.price)}</div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default observer(HomeTracks);
