import React from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ListCart from './CartList';
import '../Styles/BookList.css';
import AuthContext from '../context/AuthContext';

const WishList = () => {
  const state = React.useContext(UserContext);
  const { removeFromWish } = React.useContext(AuthContext);
  const len = state?.cart?.length;
  const history = useHistory();

  return (
    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list">
              <h5 className="mb-4">
                Wish List (<span>{len}</span> items)
              </h5>
              <ListCart cart={state?.cart} removeFromCart={removeFromWish} isWish={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WishList;
