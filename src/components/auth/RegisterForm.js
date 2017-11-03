import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <form onSubmit={handleSubmit} className="row justify-content-center">
      <div className={errors.firstname ? 'col-12 form-group has-error' : 'col-12 form-group'}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
          value={user.firstname}
          className="form-control"
        />
        {errors.firstname && <small className="has-error">{errors.firstname}</small>}
      </div>
      <div className={errors.lastname ? 'col-12 form-group has-error' : 'col-12 form-group'}>
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
          value={user.lastname}
          className="form-control"
        />
        {errors.lastname && <small className="has-error">{errors.lastname}</small>}
      </div>
      <div className={errors.email ? 'col-12 form-group has-error' : 'col-12 form-group'}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          className="form-control"
        />
        {errors.email && <small className="has-error">{errors.email}</small>}
      </div>
      <div className={errors.password ? 'col-12 form-group has-error' : 'col-12 form-group'}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          className="form-control"
        />
        {errors.password && <small className="has-error">{errors.password}</small>}
      </div>
      <div className={errors.passwordConfirmation ? 'col-12 form-group has-error' : 'col-12 form-group'}>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.passwordConfirmation}
          className="form-control"
        />
        {errors.passwordConfirmation && <small className="has-error">{errors.passwordConfirmation}</small>}
      </div>
      <div className="col-auto">
        <button className="btn btn-primary">Register</button>
      </div>
    </form>
  );
};

export default RegisterForm;
