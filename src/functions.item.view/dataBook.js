import React from 'react';

export default function DataBook(props) {
  const productBook = props.Book[0].NameOfTheBook;
  const productAuthor = props.Book[0].Author;
  return (
    <h3 className="bookAuthor">{productAuthor} - {productBook}</h3>
  )
}