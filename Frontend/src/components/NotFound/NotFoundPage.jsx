import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="error-code">404</h1>
      <h2 className="error-message">Page Not Found</h2>
      <p className="error-description">
        Oops! The page you&#39;re looking for doesn&#39;t exist. It might have been moved or deleted.
      </p>
      <Link to="/" className="home-button">
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
