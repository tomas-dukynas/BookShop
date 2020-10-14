import React from 'react';

export default function DataPrice({ Book }) {
  const productPrice = Book[0]?.Price;
  return <p className="price"> {productPrice} € </p>;
}
