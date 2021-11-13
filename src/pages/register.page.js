import React from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AuthContext from '../context/AuthContext';
import passwordRegex from '../components/PasswordRegex';
import emailRegex from '../components/EmailRegex';
import Error from '../components/Error';

const Register = () => {
  const { register } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('em@gmail.com');
  const [password, setPassword] = React.useState('abc');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const history = useHistory();

  const handleError = (err) => {
    setLoading(false);
    setError(err);
  };

  const handleEmailInput = () => {
    if (emailRegex.test(String(email).toLowerCase())) {
      handleError('Invalid email or password');
    }
  };

  const handlePasswordInput = () => {
    if (passwordRegex.test(String(password).toLowerCase())) {
      handleError('Password must contain at least 8 characters');
    }
  };

  const onButtonPress = async (event) => {
    event.preventDefault();
    handleEmailInput();
    if (!error) {
      handlePasswordInput();
    }

    if (!error) {
      setLoading(true);
      try {
        await register(email, password);
        history.push('/sign-in');
      } catch (e) {
        handleError(e.message);
      }
    }
  };

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
      </button>
      <p className="forgot-password text-right">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        Already registered <a href="#">sign in?</a>
      </p>
      {loading ? <Spinner animation="border" className="spinner" /> : ''}
    </form>
  );
};
export default Register;
