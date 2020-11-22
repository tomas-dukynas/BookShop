import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import useAuth from './hooks/useAuth';
import AuthContext from './context/AuthContext';
import NavBar from './components/NavBar';
import UserContext from './context/UserContext';

import CartContext from './context/CartContext';

const stripePromise = loadStripe(
  'pk_test_51HlCOSLzMQ3V6wEcRLjjYFMw7RxivPRSLwhAeEiVuV2cjmQiIHBttfrWZtdNdzvzoeK9fYQAHTIDCUuIHKXM5bCE00PnHlaeF2',
);


const App = () => {
  const { auth, state, effect } = useAuth();

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
  return (
    <Elements stripe={stripePromise}>
      <CartContext.Provider value={effect}>
        <AuthContext.Provider value={auth}>{renderScreens()}</AuthContext.Provider>
      </CartContext.Provider>



    ) ;
    {/*: (
      <UserContext.Provider value={state}>
        <NavBar />
      </UserContext.Provider>

    );*/}
  };
  //<AuthContext.Provider value={auth}>{renderScreens()}</AuthContext.Provider>
  return (
    <Elements stripe={stripePromise}>

      <CartContext.Provider value={effect}>
        <AuthContext.Provider value={auth}>{renderScreens()}</AuthContext.Provider>
      </CartContext.Provider>



    </Elements>
  );
};

export default App;
