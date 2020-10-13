import React from 'react';

export default function DataBook(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const productBook = props.Book[0].NameOfTheBook;
  // eslint-disable-next-line react/destructuring-assignment
  const productAuthor = props.Book[0].Author;
  return (
    <h3 className="bookAuthor">
      {productAuthor} - {productBook}
    </h3>
  );
}
