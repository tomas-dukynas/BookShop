import React from 'react';

export default function DataCategories(props) {
  const productCategories = props.Categories[0].NameOfTheCategory;
  const productCategories1 = props.Categories[1].NameOfTheCategory;

  return (
    <p className="categories">{productCategories}, {productCategories1}</p>
  )
}