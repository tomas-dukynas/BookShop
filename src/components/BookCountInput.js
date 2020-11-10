import React from 'react';
import '../Styles/BookCountInput.css';
import AuthContext from '../context/AuthContext';

const BookCountInput = ({ book }) => {
  const { decreaseCountAndPrice, increaseCountAndPrice, removeFromCart } = React.useContext(
    AuthContext,
  );
  const decreaseCheck = () => {
    if (book.count === 1) {
      removeFromCart(book);
    } else {
      decreaseCountAndPrice(book);
    }
  };
  return (
    <div>
      <div className="def-number-input number-input safari_only mb-0 w-100">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="btn" onClick={decreaseCheck}>
          -
        </button>
        <input className="quantity" min="0" name="quantity" value={book?.count} type="number" />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="btn" onClick={() => increaseCountAndPrice(book)}>
          +
        </button>
      </div>
    </div>
  );
};
export default BookCountInput;
