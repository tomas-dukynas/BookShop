import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ListCart from './CartList';
import '../Styles/BookList.css';
import AuthContext from '../context/AuthContext';
import BASE_URL from '../config/IpAdress';

const WishList = () => {
  const state = React.useContext(UserContext);
  const { addToWish } = React.useContext(AuthContext);
  const len = state?.wish?.length;
  const history = useHistory();

  const removeFromWish = async (oneBook) => {
    let wishId = null;
    const wishList = state.wish;
    wishList.forEach((bookO, index) => {
      if (bookO.id === oneBook.id) {
        wishList.splice(index, 1);
      }
    });

    addToWish(wishList);

    await axios
      .get('http://localhost:1337/wish-lists/', {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        data.forEach((item) => {
          if (item.UsersEmail === state.user?.email) {
            wishId = item.id;
          }
        });
      })
      .catch((e) => console.log(e));

    await axios.put(
      `${BASE_URL}/wish-lists/${wishId}`,
      {
        ListOfBooks: { arrayOfBooks: wishList },
        UsersEmail: state.user?.email,
        user: state.user?.email,
      },
      {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      },
    );
  };

  return (
    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list">
              <h5 className="mb-4">
                Wish List (<span>{len}</span> items, maximum is five)
              </h5>
              <ListCart cart={state?.wish} removeFromCart={removeFromWish} isWish />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WishList;
