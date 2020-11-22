import React, { useEffect } from 'react';
import axios from 'axios';
import BooksList from '../components/BooksList';
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
  const [searchResultsAuthors, setSearchResultsAuthors] = React.useState([]);

  let arrayOfBooks = [];
  //console.log(categoriesArray, 'OUTSIDE BEFORE');
  React.useEffect(() => {
    if (searchTermAuthors) {
      if (authorsArray?.toString().includes(searchTermAuthors.toString())) {
        //setAuthorsArray(authorsArray.filter((a) => a.toString() !== searchTermAuthors.toString()));
        let ArrAut = authorsArray.filter((a) => a.toString() !== searchTermAuthors.toString());
        setAuthorsArray(ArrAut);
      } else {
        if (authorsArray[0] === '') {
          //categoriesArray[0] = searchTermCategories;
          setAuthorsArray(searchTermAuthors);
        } else {
          let ArrAut = authorsArray;
          ArrAut.push(searchTermAuthors);
          setAuthorsArray(ArrAut);
        }
      }
    }
  }, [searchTermAuthors]);

  React.useEffect(() => {
    const books = listBooks?.map((book) => {
      //const categ = book.Author.map((aut) => {
      const arr = authorsArray.map((ar) => {
        if (ar.toString() === book.Author.toString()) {
          if (arrayOfBooks[0] === null || arrayOfBooks[0] === book) {
            arrayOfBooks[0] = book;
            //console.log(arrayOfBooks);
          } else {
            arrayOfBooks.push(book);
            //console.log("WORK");
          }

          return book;
        } else {
          return null;
        }
      });
      const filtered = arr.filter(function (el) {
        return el != null;
      });
      //console.log(filtered);
      return arr;
      // });
      //return categ;
    });

    const uniqueBooks = Array.from(new Set(arrayOfBooks)); // galutinai isfiltruota, sitas turime rodyti
    //console.log(uniqueBooks);
    if (uniqueBooks.length !== 0) {
      //console.log(uniqueBooks); // rodomos galutines knygos
    }

    if (authorsArray?.length === 0 && bookList.length !== 0) {
      //niekas nekeiciama ir rodoma bookList
      filterBooks(bookList);
    }

    if (uniqueBooks.length !== 0) {
      filterBooks(uniqueBooks);
    }
  }, [searchTermAuthors]);

  //console.log(array, 'OUTSIDE');
  //console.log(categoriesArray, 'AFTER OUTSIDE');
  if (authors.length === 0) {
    return null;
  } else {
    const autho = authors?.map((aut) => {
      //console.log(aut.NameOfTheAuthor);
      return (
        <tr>
          <td>
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
}
