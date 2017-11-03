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
    <nav className="navbar navbar-expand-lg">
      <div className="navbar-nav mr-auto">
        <div className="navbar-brand">
          <Link to="/">Election Mapper</Link>
        </div>
      </div>
      <div className="navbar-nav ml-auto">
        {!Auth.isAuthenticated() && <Link to="/login" className="nav-item nav-link">Login</Link>}
        {!Auth.isAuthenticated() && <Link to="/register" className="nav-item nav-link">Register</Link>}
        {Auth.isAuthenticated() && <a href="#" onClick={logout} className="nav-item nav-link">Logout</a>}
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
