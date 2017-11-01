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
    <nav className="navbar navbar-light bg-light">
      <div className="navbar-right">
      {!Auth.isAuthenticated() && <Link to="/login" className="btn btn-primary">Login</Link>}
      {!Auth.isAuthenticated() && <Link to="/register" className="btn btn-primary">Register</Link>}
      {Auth.isAuthenticated() && <a href="#" onClick={logout} className="btn btn-primary">Logout</a>}
    </div>
    </nav>
  );
};

export default withRouter(Navbar);
