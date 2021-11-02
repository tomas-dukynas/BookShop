const auth = React.useMemo(
    () => ({
      login: async (email, password) => {
        const { data } = await axios.post(`${BASE_URL}/auth/local`, {
          identifier: email,
          password,
        });
        const user = {
          email: data.user.email,
          token: data.jwt,
          id: data.user.id,
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
    }),
    [],
  );