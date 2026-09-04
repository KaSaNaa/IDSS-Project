import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="idss-notfound">
      <h1>404</h1>
      <p>That page isn’t part of the IDSS host.</p>
      <Link to="/" className="idss-btn idss-btn--primary">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
