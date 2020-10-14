import React from 'react';

export default function DataBook({ Book }) {
  const productBook = Book[0]?.NameOfTheBook;
  const productAuthor = Book[0]?.Author;
  return (
    <h3 className="bookAuthor">
      {productAuthor} - {productBook}
    </h3>
  );
}
