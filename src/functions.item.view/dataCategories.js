import React from 'react';

export default function DataCategories(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const productCategories = props.Categories[0].NameOfTheCategory;
  // eslint-disable-next-line react/destructuring-assignment
  const productCategories1 = props.Categories[1].NameOfTheCategory;

  return (
    <p className="categories">
      {productCategories}, {productCategories1}
    </p>
  );
}
