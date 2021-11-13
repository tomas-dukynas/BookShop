import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ListCart from './CartList';
import '../Styles/BookList.css';
import AuthContext from '../context/AuthContext';
import SuccessModal from './SuccessModal';
import Error from './Error';

const ShoppingBag = () => {
  const [promo, setPromo] = React.useState('');
  const [promoModal, setPromoModal] = React.useState(false);
  const [usedPromo, setUsedPromo] = React.useState(false);
  const [error, setError] = React.useState(false);
  const state = React.useContext(UserContext);
  const { removeFromCart, setPrice } = React.useContext(AuthContext);
  const len = state?.cart?.length;
  const history = useHistory();

  const checkout = () => {
    history.push('/checkout');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.price) {
      axios
        .get('http://localhost:1337/promo-codes', {
          headers: {
            Authorization: `Bearer ${state.user?.token}`,
          },
        })
        .then(({ data }) => {
          data.forEach((item) => {
            if (item.promoCode === promo) {
              const newPrice = state.price - state.price * 0.15;
              setPrice(newPrice);
              setUsedPromo(true);
              setPromoModal(true);
              setError(false);
              axios.delete(`http://localhost:1337/promo-codes/${item.id}`, {
                headers: {
                  Authorization: `Bearer ${state.user?.token}`,
                },
              });
            } else {
              setError(true);
            }
          });
        })
        .catch(() => setError(true));
    } else {
      setError(true);
    }
  };

  return (
    <section>
      <SuccessModal
        modalIsOpen={promoModal}
        setModalIsOpen={setPromoModal}
        text="You got 15% discount!!!!"
        handleModalClose={() => setPromoModal(false)}
      />
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list">
              <h5 className="mb-4">
                Cart (<span>{len}</span> items)
              </h5>
              <ListCart cart={state?.cart} removeFromCart={removeFromCart} isWish={false} />
              <p className="text-primary mb-0">
                <i className="fas fa-info-circle mr-1" /> Do not delay the purchase, adding items to
                your cart does not mean booking them.
              </p>
            </div>
          </div>
          <div className="mb-3">
            <div className="pt-4">
              <h5 className="mb-4">Expected shipping delivery</h5>

              <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
            </div>
          </div>
          <div className="mb-3">
            <div className="pt-4">
              <h5 className="mb-4">We accept</h5>

              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/amex.svg"
                alt="American Express"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
                alt="Mastercard"
              />
              <img
                className="mr-2"
                width="45px"
                src="https://mdbootstrap.com/wp-content/plugins/woocommerce/includes/gateways/paypal/assets/images/paypal.png"
                alt="PayPal acceptance mark"
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mb-3">
            <div className="pt-4">
              <h5 className="mb-3">The total amount of</h5>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Temporary amount
                  <span>${state.price}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>The total amount of</strong>
                  </div>
                  <span>
                    <strong>${state.price}</strong>
                  </span>
                </li>
              </ul>
              {state.price ? (
                <button type="button" className="btn btn-primary btn-block" onClick={checkout}>
                  go to checkout
                </button>
              ) : (
                ''
              )}
            </div>
          </div>
          {state.user && (
            <div className="mb-3">
              <div className="pt-4">
                Add a discount code (only one promo code can be used)
                <span>
                  <i className="fas fa-chevron-down pt-1" />
                </span>
                <div className="mt-3">
                  <div className="md-form md-outline mb-0">
                    {!usedPromo && (
                      <form onSubmit={handleSubmit}>
                        <input
                          type="text"
                          id="discount-code"
                          className="form-control font-weight-light"
                          placeholder="Enter discount code"
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                        />
                        <button type="submit">Enter</button>
                      </form>
                    )}
                    {usedPromo && <h3>Thank you for using promo code</h3>}
                    {error && (
                      <Error error="Bad Promo Code or nothing in shopping bag please try again" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default ShoppingBag;
