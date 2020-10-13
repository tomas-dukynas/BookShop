import React from 'react';

export default function DataPrice(props) {
  const productPrice = props.Book[0].Price;
  return (
    <p className="price"> {productPrice} € </p>
  )
}