import React from 'react';

const Register = () => {
  return (
    <form>
      <h3>Sign Up</h3>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>First name</label>
        <input type="text" className="form-control" placeholder="First name" />
      </div>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Last name</label>
        <input type="text" className="form-control" placeholder="Last name" />
      </div>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Email address</label>
        <input type="email" className="form-control" placeholder="Enter email" />
      </div>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Enter password" />
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Sign Up
      </button>
      <p className="forgot-password text-right">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Already registered <a href="#">sign in?</a>
      </p>
    </form>
  );
};
export default Register;
