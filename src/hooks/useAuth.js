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

  const cart = [];
  let newCart = [];
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
        console.log(user);
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
      addToCart: async (oneBook) => {
        let count = 1;
        let contains = false;
        cart.forEach((book, index) => {
          if (book.id === oneBook.id) {
            contains = true;
            // eslint-disable-next-line no-plusplus
            count++;
            newCart = cart.slice(index, index + 1);
          }
        });
        const book = Object.assign(oneBook);
        book.count = count;
        cart.push(book);
        if (!contains) {
          newCart.push(book);
        }
        dispatch(createAction('SET_CART', newCart));
        console.log(newCart);
        console.log(cart);
      },
    }),
    [],
  );
  return { auth, state };
}
