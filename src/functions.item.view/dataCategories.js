import React from 'react';

export default function DataCategories({ Categories }) {
  const productCategories = Categories[0]?.NameOfTheCategory;
  const productCategories1 = Categories[1]?.NameOfTheCategory;

  return (
    <p className="categories">
      {productCategories}, {productCategories1}
    </p>
  );
}
