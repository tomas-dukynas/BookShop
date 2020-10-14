import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import useAuth from './hooks/useAuth';
import AuthContext from './context/AuthContext';
import NavBar from './components/NavBar';
import CartContext from './context/CartContext';

const App = () => {
  const { auth, state } = useAuth();

  const renderScreens = () => {
    return (
      <CartContext.Provider value={state?.cart}>
        <NavBar />
      </CartContext.Provider>
    );
  };

  return <AuthContext.Provider value={auth}>{renderScreens()}</AuthContext.Provider>;
};

export default App;
