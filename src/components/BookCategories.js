import React from 'react';

export default function BookCategories({ categories }) {
  const renderedCategory = categories.map((category) => {
    return <div key={category.id}>{category.NameOfTheCategory}</div>;
  });
  return <div className="categories">{renderedCategory}</div>;
}
