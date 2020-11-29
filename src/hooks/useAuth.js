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
        case 'SET_TOTAL_PRICE':
          return {
            ...state,
            price: action.payload,
          };
        case 'SET_WISH_LIST':
          return {
            ...state,
            wish: action.payload,
          };
        case 'SET_COMMENTS':
          return {
            ...state,
            comments: action.payload,
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

  let cart = [];
  let totalPrice = 0;
  let newCart = [];
  let wishList = [];
  let arrayCom = [];

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
      addToCart: (oneBook) => {
        let contains = false;
        let count = 1;
        totalPrice += oneBook.Price;
        const book = Object.assign(oneBook);
        cart.forEach((bookO) => {
          if (bookO.id === oneBook.id) {
            contains = true;
            // eslint-disable-next-line no-plusplus
            count++;
          }
        });
        book.count = count;
        cart.push(book);
        if (!contains) {
          book.count = 1;
          newCart.push(book);
        }
        dispatch(createAction('SET_CART', newCart));
        dispatch(createAction('SET_TOTAL_PRICE', totalPrice));
      },
      removeFromCart: (oneBook) => {
        const book = Object.assign(oneBook);
        newCart.forEach((bookO, index) => {
          if (bookO.id === oneBook.id) {
            newCart.splice(index, 1);
          }
        });

        cart.forEach((bookO, index) => {
          if (bookO.id === oneBook.id) {
            cart.splice(index);
            console.log(cart.splice(index));
          }
        });

        totalPrice -= book.Price * book.count;
        // eslint-disable-next-line no-plusplus
        book.count--;
        dispatch(createAction('SET_CART', newCart));
        dispatch(createAction('SET_TOTAL_PRICE', totalPrice));
      },
      decreaseCountAndPrice: (oneBook) => {
        const book = Object.assign(oneBook);
        cart.forEach((bookO, index) => {
          if (bookO.id === oneBook.id) {
            cart.splice(index, 1);
          }
        });
        // eslint-disable-next-line no-plusplus
        book.count--;
        totalPrice -= book.Price;
        dispatch(createAction('SET_CART', newCart));
        dispatch(createAction('SET_TOTAL_PRICE', totalPrice));
      },
      increaseCountAndPrice: (oneBook) => {
        const book = Object.assign(oneBook);
        // eslint-disable-next-line no-plusplus
        book.count++;
        totalPrice += book.Price;
        dispatch(createAction('SET_CART', newCart));
        dispatch(createAction('SET_TOTAL_PRICE', totalPrice));
      },
      resetCartAndPrice: () => {
        cart = [];
        totalPrice = 0;
        newCart = [];
        dispatch(createAction('SET_CART', newCart));
        dispatch(createAction('SET_TOTAL_PRICE', totalPrice));
      },
      addToWish: (arrayOfBooks) => {
        wishList = arrayOfBooks;
        dispatch(createAction('SET_WISH_LIST', wishList));
      },
      addComment: (comments) => {
        arrayCom = comments;
        dispatch(createAction('SET_COMMENTS', arrayCom));
      },
    }),
    [],
  );
  return { auth, state };
}
