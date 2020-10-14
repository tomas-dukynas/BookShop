import React from 'react';

export default function DataDescription({ Book }) {
  // eslint-disable-next-line react/destructuring-assignment
  const productDescription = Book[0]?.Description;
  return <p className="categories">{productDescription}</p>;
}
