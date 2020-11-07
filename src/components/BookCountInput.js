import React from 'react';

const BookCountInput = ({ count }) => {
  console.log(count);
  return (
    <div>
      <div className="def-number-input number-input safari_only mb-0 w-100">
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="minus decrease" />
        <input className="quantity" min="0" name="quantity" defaultValue={count} type="number" />
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type="button" className="plus increase" />
      </div>
    </div>
  );
};
export default BookCountInput;
