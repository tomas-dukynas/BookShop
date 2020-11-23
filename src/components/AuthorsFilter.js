import React from 'react';
import '../Styles/BookList.css';

export default function AuthorsFilter({
  authors,
  bookList,
  listBooks,
  array,
  filterBooks,
  authorsArray,
  setAuthorsArray,
}) {
  const [searchTermAuthors, setSearchTermAuthors] = React.useState('');

  const arrayOfBooks = [];

  React.useEffect(() => {
    if (searchTermAuthors) {
      if (authorsArray?.toString().includes(searchTermAuthors.toString())) {
        const ArrAut = authorsArray.filter((a) => a.toString() !== searchTermAuthors.toString());
        setAuthorsArray(ArrAut);
      } else if (authorsArray[0] === '') {
        setAuthorsArray(searchTermAuthors);
      } else {
        const ArrAut = authorsArray;
        ArrAut.push(searchTermAuthors);
        setAuthorsArray(ArrAut);
      }
    }
  }, [searchTermAuthors]);

  React.useEffect(() => {
    const books = listBooks?.map((book) => {
      const arr = authorsArray.map((ar) => {
        if (ar.toString() === book.Author.toString()) {
          if (arrayOfBooks[0] === null || arrayOfBooks[0] === book) {
            arrayOfBooks[0] = book;
          } else {
            arrayOfBooks.push(book);
          }

          return book;
        }
        return null;
      });
      const filtered = arr.filter((el) => {
        return el != null;
      });

      return arr;
    });

    const uniqueBooks = Array.from(new Set(arrayOfBooks));

    if (authorsArray?.length === 0 && bookList.length !== 0) {
      filterBooks(bookList);
    }

    if (uniqueBooks.length !== 0) {
      filterBooks(uniqueBooks);
    }
  }, [searchTermAuthors]);

  if (authors.length === 0) {
    return null;
  }
  const autho = authors?.map((aut) => {
    return (
      <tr>
        <td>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input
              type="checkbox"
              className="filterBox"
              value={aut.NameOfTheAuthor || ' '}
              onChange={(e) => setSearchTermAuthors(e.target.value)}
            />
            {aut.NameOfTheAuthor}
          </label>
        </td>
      </tr>
    );
  });

  return <tbody className="categoriesDivBox">{autho}</tbody>;
}
