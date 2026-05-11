import React from 'react';
import { observer } from 'mobx-react-lite';
import TeacherSidebar from '../dashboard/components/TeacherSidebar';
import TeacherHeader from '../dashboard/components/TeacherHeader';
import TeacherProfile from './TeacherProfile';
import '../dashboard/TeacherLayout.css';

const TeacherProfilePage: React.FC = () => (
  <div className="teacher-layout">
    <TeacherSidebar />
    <main className="teacher-content">
      <TeacherHeader />
      <TeacherProfile />
    </main>
  </div>
);

export default observer(TeacherProfilePage);
