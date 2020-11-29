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

  let arrayOfBooks = [];

  const OnCheckBoxPress = (value) => {
    //console.log(value, " FUN");

    setSearchTermAuthors(value);

    if (value) {
      if (authorsArray?.toString().includes(value.toString())) {
        let ArrAut = authorsArray.filter((a) => a.toString() !== value.toString());
        setAuthorsArray(ArrAut);
      } else {
        if (authorsArray[0] === '') {
          setAuthorsArray(value);
        } else {
          let ArrAut = authorsArray;
          ArrAut.push(value);
          setAuthorsArray(ArrAut);
        }
      }
    }


  };


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
        } else {
          return null;
        }
      });
      const filtered = arr.filter(function (el) {
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
  } else {
    const autho = authors?.map((aut) => {
      return (
        <tr>
          <td>
            <label>
              <input
                type="checkbox"
                className="filterBox"
                value={aut.NameOfTheAuthor || ' '}

                onChange={(e) => OnCheckBoxPress(e.target.value)}

              />
              {aut.NameOfTheAuthor}
            </label>
          </td>
        </tr>
      );
    });

    return <tbody className="categoriesDivBox">{autho}</tbody>;
  }
}
