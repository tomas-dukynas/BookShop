import React from 'react';
import BookCountInput from './BookCountInput';
import '../Styles/LoginMobile.css';

export default function ListCart({ cart, removeFromCart, isWish }) {
  return (
    <ul>
      {cart?.map((cart1) => (
        <li>
          <div className="row mb-4">
            <div className="col-md-5 col-lg-3 col-xl-3">
              <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                <img className="img-fluid w-100" src={cart1?.PhotoOfTheBook.name} alt="Sample" />
              </div>
            </div>
            <div className="col-md-7 col-lg-9 col-xl-9">
              <div>
                <div className="d-flex justify-content-between">
                  <div className="someText">
                    <h5 className="someText">{cart1?.NameOfTheBook}</h5>
                    <h6 className="someText">{cart1?.Author}</h6>
                  </div>
                  {isWish ? null : <BookCountInput book={cart1} />}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <button type="button" onClick={() => removeFromCart(cart1)}>
                      Remove item
                    </button>
                  </div>
                  <p className="mb-0">
                    <span>
                      <strong id="summary" className="someText">
                        {cart1?.Price} €
                      </strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
