import React from 'react';

export default function DataPrice(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const productPrice = props.Book[0].Price;
  return <p className="price"> {productPrice} € </p>;
}
