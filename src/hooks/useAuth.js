import React from 'react';
import axios from 'axios';
import BASE_URL from '../config/IpAdress';
import createAction from '../utils/CreateAction';
import Sleep from '../utils/Sleep';

export default function useAuth() {
  const [state, dispatch] = React.useReducer(
    // eslint-disable-next-line no-shadow
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            loading: false,
            user: { ...action.payload },
          };
        case 'REMOVE_USER':
          return {
            ...state,
            user: undefined,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        case 'SET_CART':
          return {
            ...state,
            cart: action.payload,
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      loading: true,
    },
  );

  const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        console.log('login', email, password);
        const { data } = await axios.post(`${BASE_URL}/auth/local`, {
          identifier: email,
          password,
        });
        const user = {
          email: data.user.email,
          token: data.jwt,
        };
        dispatch(createAction('SET_USER', user));
      },
      logout: async () => {
        dispatch(createAction('REMOVE_USER'));
      },
      register: async (email, password) => {
        // await Sleep(2000);
        const response = await axios.post(`${BASE_URL}/auth/local/register`, {
          username: email,
          email,
          password,
        });

        const { data } = response;
        const user = {
          email: data.user.email,
          token: data.jwt,
        };
        dispatch(createAction('SET_USER', user));
      },
      addToCart: async (id) => {
        const response = await axios({
          method: 'GET',
          url: `http://localhost:1337/books/${id}`,
        });
        const cart = response.data;
        console.log(cart);
        dispatch(createAction('SET_CART', cart));
      },
    }),
    [],
  );
  return { auth, state };
}
