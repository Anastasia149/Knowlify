import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentSidebar from './components/StudentSidebar';
import StudentHeader from './components/StudentHeader';
import './StudentLayout.css';

const StudentLayout: React.FC = () => {
  return (
    <div className="student-layout">
      <StudentSidebar />
      <main className="student-content">
        <StudentHeader />
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
