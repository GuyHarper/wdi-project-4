import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <h1>Election Mapper</h1>
      <Link to="/login" className="btn btn-primary">Login to create a projection</Link>
    </div>
  );
};

export default LandingPage;
