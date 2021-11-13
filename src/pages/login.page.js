import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AuthContext from '../context/AuthContext';
import emailRegex from '../components/EmailRegex';
import '../Styles/LoginMobile.css';

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('test1@gmail.com');
  const [password, setPassword] = React.useState('12345678');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [, setLoggedIn] = useState(false);
  const history = useHistory();
  function onButtonPress(event) {
    event.preventDefault();
    if (emailRegex.test(String(email).toLowerCase())) {
      (async () => {
        setLoading(true);
        try {
          await login(email, password);
          setLoggedIn(true);
          history.push('/list-view');
        } catch (e) {
          setError('Invalid Email or Password');
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
      setError('Invalid Email or Password');
    }
  }
  return (
    <form>
      <h3>Sign In</h3>

      <div className="errorCont">
        <h2 className="errorText">{error}</h2>
      </div>
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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

      <button type="submit" className="btn btn-primary btn-block" onClick={(e) => onButtonPress(e)}>
        Submit
      </button>
      <p className="forgot-password text-right">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Forgot <a href="#">password?</a>
      </p>
      {loading ? <Spinner animation="border" className="spinner" /> : ''}
    </form>
  );
};
export default Login;
