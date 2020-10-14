import React from 'react';
import CartContext from '../context/CartContext';

const ShoppingBag = () => {
  const cart = React.useContext(CartContext);
  return (
    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list">
              <h5 className="mb-4">
                Cart (<span>1</span> items)
              </h5>

              <div className="row mb-4">
                <div className="col-md-5 col-lg-3 col-xl-3">
                  <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                    <img className="img-fluid w-100" src={cart?.PhotoOfTheBook.name} alt="Sample" />
                  </div>
                </div>
                <div className="col-md-7 col-lg-9 col-xl-9">
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <h5>{cart?.NameOfTheBook}</h5>
                        <h6>{cart?.Author}</h6>
                        <p className="mb-3 text-muted text-uppercase small">{cart?.Description}</p>
                      </div>
                      <div>
                        <div className="def-number-input number-input safari_only mb-0 w-100">
                          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                          <button type="button" className="minus decrease" />
                          <input
                            className="quantity"
                            min="0"
                            name="quantity"
                            value="1"
                            type="number"
                          />
                          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                          <button type="button" className="plus increase" />
                        </div>
                        <small id="passwordHelpBlock" className="form-text text-muted text-center">
                          (Note, 1 piece)
                        </small>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <i className="fas fa-trash-alt mr-1" /> Remove item{' '}
                      </div>
                      <p className="mb-0">
                        <span>
                          <strong id="summary">{cart?.Price} €</strong>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                  <span>$25.98</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Gratis</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>The total amount of</strong>
                    <strong>
                      <p className="mb-0">(including VAT)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>$53.98</strong>
                  </span>
                </li>
              </ul>

              <button type="button" className="btn btn-primary btn-block">
                go to checkout
              </button>
            </div>
          </div>
          <div className="mb-3">
            <div className="pt-4">
              Add a discount code (optional)
              <span>
                <i className="fas fa-chevron-down pt-1" />
              </span>
              <div className="collapse" id="collapseExample">
                <div className="mt-3">
                  <div className="md-form md-outline mb-0">
                    <input
                      type="text"
                      id="discount-code"
                      className="form-control font-weight-light"
                      placeholder="Enter discount code"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ShoppingBag;