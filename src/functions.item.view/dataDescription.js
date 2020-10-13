import React from 'react';

export default function DataDescription(props) {
  const productDescription = props.Book[0].Description;
  return (
    <p className="categories">{productDescription}</p>
  )
}