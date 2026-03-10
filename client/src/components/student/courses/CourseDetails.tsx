import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../../index';
import { Icon } from '@iconify/react';
import './CourseDetails.css';
import { ICourse } from '../../../models/ICourse';
import Loader from '../../common/Loader';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { store } = useContext(Context);
  const [course, setCourse] = useState<ICourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('CourseDetails mounted, id:', id);
    if (id) {
      store.getCourseById(id).then(data => {
        console.log('Data received from store:', data);
        if (data) {
          setCourse(data);
        }
        setLoading(false);
      });
    }
  }, [id, store]);

  if (loading) {
    return <Loader size="full-page" />;
  }

  if (!course) {
    return <div>Курс не найден</div>;
  }

  // Mock data for mentor for now
  const mentor = {
      name: 'Нина Ким',
      role: 'Веб/мобильный разработчик',
      avatar: 'https://via.placeholder.com/50',
      rating: 4.9,
      reviewsCount: 120
  };

  return (
    <div className="course-details-page">
      <div className="course-details-main">
        <h2>{course.title}</h2>
        <img src={course.image_url} alt={course.title} className="course-details-image" />
        
        <div className="course-details-tabs">
            <button className="tab-button active">Описание</button>
            <button className="tab-button">Инструменты</button>
            <button className="tab-button">Отзывы</button>
            <button className="tab-button">Сокурсники</button>
        </div>

        <div className="course-details-tab-content">
            <p>{course.description}</p>
        </div>

      </div>
      <div className="course-details-sidebar">
        <div className="course-overview-card">
            <h4>Обзор</h4>
            <div className="overview-grid">
                <div className="overview-item">
                    <Icon icon="mdi:book-open-page-variant-outline" />
                    <span>{course.lessons_count} модулей</span>
                </div>
                <div className="overview-item">
                    <Icon icon="mdi:play-circle-outline" />
                    <span>{course.lessons_count} видео</span>
                </div>
                <div className="overview-item">
                    <Icon icon="mdi:star-outline" />
                    <span>50 отзывов</span>
                </div>
            </div>
            <div className="price-section">
                <h4>Цена</h4>
                <p>¥{course.price}</p>
            </div>
            <button className="add-to-cart-button">Добавить в корзину</button>
        </div>

        <div className="mentor-card">
            <h4>О менторе</h4>
            <div className="mentor-info">
                <img src={mentor.avatar} alt={mentor.name} />
                <div>
                    <h5>{mentor.name}</h5>
                    <p>{mentor.role}</p>
                </div>
            </div>
            <div className="mentor-rating">
                <Icon icon="mdi:star" />
                <span>{mentor.rating}/5 ({mentor.reviewsCount} отзывов)</span>
            </div>
        </div>

      </div>
    </div>
  );
};

export default observer(CourseDetails);
