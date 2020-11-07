import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useAuth from './hooks/useAuth';
import AuthContext from './context/AuthContext';
import NavBar from './components/NavBar';
import CartContext from './context/CartContext';
import UserContext from './context/UserContext';

const App = () => {
  const { auth, state } = useAuth();

  const renderScreens = () => {
    return typeof state.user === 'undefined' ? (
      <UserContext.Provider value={state}>
        <NavBar />
      </UserContext.Provider>
    ) : (
      <UserContext.Provider value={state}>
        <NavBar />
      </UserContext.Provider>
    );
  };
  return <AuthContext.Provider value={auth}>{renderScreens()}</AuthContext.Provider>;
};

export default App;
