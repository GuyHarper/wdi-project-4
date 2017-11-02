import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <Link to="/">Election Mapper</Link>
        </div>
      </div>
      <div className="navbar-right">
        {!Auth.isAuthenticated() && <Link to="/login">Login</Link>}
        {!Auth.isAuthenticated() && <Link to="/register">Register</Link>}
        {Auth.isAuthenticated() && <a href="#" onClick={logout}>Logout</a>}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
