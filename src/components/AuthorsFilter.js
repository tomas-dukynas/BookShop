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
    if(value.toString()==='all')
    {
      filterBooks(listBooks);
      setAuthorsArray(true);
    }
    else {

      if (authorsArray === true) {
        setAuthorsArray(false)
      }



      const books = bookList?.map((book) => {

          if (value.toString() === book.Author.toString()) {
            if (arrayOfBooks[0] === null || arrayOfBooks[0] === book) {
              arrayOfBooks[0] = book;
            } else {
              arrayOfBooks.push(book);
            }


          } else {
            return null;
          }


        });

      const uniqueBooks = Array.from(new Set(arrayOfBooks));

/*      arrayOfBooks = [];
      const boo = uniqueBooks?.map((book) => {
        const li = bookList?.map((book1) => {
          if(book === book1) {
            if (arrayOfBooks[0] === null || arrayOfBooks[0] === book) {
              arrayOfBooks[0] = book;
            } else {
              arrayOfBooks.push(book);
            }
          }
        })
      });*/

      filterBooks(uniqueBooks);
      //filterBooks(arrayOfBooks);


    }
  };

/*
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
*/
  if (authors.length === 0) {
    return null;
  } else {
    const autho = authors?.map((aut) => {
      return (
        <tr>
          <td>
            <label>
              <input
                type="radio"
                className="filterBox"
                value={aut.NameOfTheAuthor || ' '}
                name="author"
                onChange={(e) => OnCheckBoxPress(e.target.value)}

              />
              {aut.NameOfTheAuthor}
            </label>
          </td>
        </tr>
      );
    });

    return (
      <tbody className="categoriesDivBox">
        <tr>
          <td>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <input
                type="radio"
                className="filterBox"
                value={ 'all'}
                name="author"

                onChange={(e) => OnCheckBoxPress(e.target.value)}


              />
              All
            </label>
          </td>
        </tr>
          {autho}
      </tbody>
    )

  }
}
