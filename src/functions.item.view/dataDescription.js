import React from 'react';

export default function DataDescription(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const productDescription = props.Book[0].Description;
  return <p className="categories">{productDescription}</p>;
}
