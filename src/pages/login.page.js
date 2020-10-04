import React from 'react';

const Login = () => {
  return (
    <form>
      <h3>Sign In</h3>

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

      <div className="form-group">
        <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1" />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <button type="submit" className="btn btn-primary btn-block">
        Submit
      </button>
      <p className="forgot-password text-right">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Forgot <a href="#">password?</a>
      </p>
    </form>
  );
};
export default Login;
