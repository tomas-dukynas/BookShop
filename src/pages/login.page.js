import React, { useState } from 'react';
import AuthContext from '../context/AuthContext';
import CheckEmail from '../components/CheckEmail';

// const [loggedIn, setLoggedIn] = useState(false);
/*
function IfLogged (loggedIn) {
  console.log(loggedIn);
  return loggedIn;

}
const Logged =(loggedIn)=> {
  //export const test = loggedIn;
  //return loggedIn;
  return loggedIn;
};
*/
// export const test = loggedIn;

const Login = () => {
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('test1@gmail.com');
  const [password, setPassword] = React.useState('12345678');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const loge = React.createContext(false);
  const log11 = React.useContext(loge);
  function onButtonPress(event) {
    event.preventDefault();
    if (CheckEmail.test(String(email).toLowerCase())) {
      (async () => {
        setLoading(true);
        try {
          await login(email, password);
        } catch (e) {
          console.log(e);
          setError(e.message);
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
      setError('Invalid Email');
    }
  }
  return (
    <form>
      <h3>Sign In</h3>

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
    </form>
  );
};
export default Login;
