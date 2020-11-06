import React from 'react';

export default function BookCategories({ categories1 }) {
  const renderedCategory = categories1?.map((category) => {
    return <div key={category.id}>{category.NameOfTheCategory}</div>;
  });
  return <div className="categories">{renderedCategory}</div>;
}
