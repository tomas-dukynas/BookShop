import React from 'react';
import {
  useHistory,
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CheckPassword from '../components/CheckPassword';
import CheckEmail from '../components/CheckEmail';
import Error from '../components/Error';

import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import Login from '../pages/login.page';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


import Login from './login.page';


const Register = () => {
  const { register } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('em@gmail.com');
  const [password, setPassword] = React.useState('abc');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const history = useHistory();

  function onButtonPress(event) {
    event.preventDefault();
    if (CheckEmail.test(String(email).toLowerCase())) {
      if (CheckPassword.test(String(password).toLowerCase())) {
        (async () => {
          setLoading(true);
          try {
            await register(email, password);

            console.log('success');

            history.push('/sign-in');

          } catch (e) {
            setError(e.message);
            setLoading(false);
          }
        })();
      } else {
        setLoading(false);
        setError('Password must contain at least 8 characters');
      }
    } else {
      setLoading(false);
      setError('Invalid email or password');
    }
  }
  console.log(loading);

  return (
    <form>
      <h3>Sign Up</h3>
      <Error error={error} />
      <div className="form-group">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary btn-block" onClick={(e) => onButtonPress(e)}>
        Sign Up

        { loading ?  <Spinner animation="border" /> : ""}
      </button>
      <p className="forgot-password text-right">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Already registered <a href="#">sign in?</a>
      </p>

    </form>

  );
};
export default Register;
