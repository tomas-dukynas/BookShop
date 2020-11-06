import React from 'react';
//import '../Styles/BookList.css';



export default function ListCart(cart) {

  if(cart) {


    const listCart = cart?.cart?.map((cart1) => {
      console.log(cart1);
      return (
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
                  <div>
                    <h5>{cart1?.NameOfTheBook}</h5>
                    <h6>{cart1?.Author}</h6>
                    {/*<p className="mb-3 text-muted text-uppercase small">{cart1?.Description}</p>*/}
                  </div>
                  <div>
                    <div className="def-number-input number-input safari_only mb-0 w-100">
                      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                      <button type="button" className="minus decrease" />
                      <input
                        className="quantity"
                        min="0"
                        name="quantity"
                        defaultValue="1"
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
                          <strong id="summary">{cart1?.Price} €</strong>
                        </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </li>
      )
    });

    return (
      <ul>{listCart}</ul>
    )
  }
  return null;

}