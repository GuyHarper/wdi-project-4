import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../lib/Auth';

const LandingPage = () => {
  return (
    <div className="frontpage-container">
      <div className="heading-container row justify-content-center">
        <div className="heading col-auto">
          <h1 className="frontpage-heading display-3">Election Mapper</h1>
        </div>
      </div>
      <div className="buttons-container row justify-content-center">
        {!Auth.isAuthenticated() && <Link to="/register" className="btn btn-primary">Register</Link>}
        {!Auth.isAuthenticated() && <Link to="/login" className="btn btn-primary">Login</Link>}
        {Auth.isAuthenticated() && <Link to="/new" className="btn btn-primary">Make a projection</Link>}
      </div>
    </div>
  );
};

export default LandingPage;
