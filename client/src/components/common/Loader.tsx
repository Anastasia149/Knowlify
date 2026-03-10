import React from 'react';
import './Loader.css';

interface LoaderProps {
  size?: 'full-page' | 'inline';
}

const Loader: React.FC<LoaderProps> = ({ size = 'inline' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
    </div>
  );
};

export default Loader;
