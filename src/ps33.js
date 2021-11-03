const authentificationActions = React.useMemo(
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
        dispatch(createAction(AuthAction.SetUser, user));
      },
      logout: async () => {
        dispatch(createAction(AuthAction.RemoveUser));
      },
      register: async (email, password) => {

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
        dispatch(createAction(AuthAction.SetUser, user));
      },
    }),
    [],
  );

 const userActions = React.useMemo(
    () => ({      
      addToCart: (item) => {
        var contains = false;
        var count = 1;
        totalPrice += item.Price;
        const book = Object.assign(item);

        cart.forEach((bookO) => {
          if (bookO.id === item.id) {
            contains = true;
            count++;
          }
        });

        book.count = count;
        cart.push(book);

        if (!contains) {
          book.count = 1;
          newCart.push(book);
        }
        dispatch(createAction(UserAction.SetCart, newCart));
        dispatch(createAction(UserAction.SetTotalPrice, totalPrice));
      },
      removeFromCart: (item) => {
        const book = Object.assign(item);

        newCart.forEach((bookO, index) => {
          if (bookO.id === item.id) {
            newCart.remove(UserAction.RemoveItem, item.id);
          }
        });

        totalPrice -= book.Price * book.count;
        book.count--;

        dispatch(createAction(UserAction.SetCart, newCart));
        dispatch(createAction(UserAction.SetTotalPrice,, totalPrice));
      },
      decreaseCountAndPrice: (item) => {
        const book = Object.assign(item);

        cart.forEach((bookO, index) => {
          if (bookO.id === item.id) {
            cart.remove(UserAction.RemoveItem, item.id);
          }
        });

        book.count--;
        totalPrice -= book.Price;

        dispatch(createAction(UserAction.SetCart, newCart));
        dispatch(createAction(UserAction.SetTotalPrice,, totalPrice));
      },
      increaseCountAndPrice: (item) => {
        const book = Object.assign(item);
        book.count++;
        totalPrice += book.Price;

        dispatch(createAction(UserAction.SetCart, newCart));
        dispatch(createAction(UserAction.SetTotalPrice,, totalPrice));
      },
    }),
    [],
  );
