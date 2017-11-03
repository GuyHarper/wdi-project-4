import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, credentials, error }) => {
  return (
    <form onSubmit={handleSubmit} className="row justify-content-center">
      <div className="col-12 form-group">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={credentials.email}
          className="form-control"
        />
      </div>
      <div className="col-12 form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={credentials.password}
          className="form-control"
        />
        {error && <small className="has-error">{error}</small>}
      </div>
      <div className="col-auto">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default LoginForm;
