import React, { useEffect } from 'react';
import axios from 'axios';
import BooksList from '../components/BooksList';
import '../Styles/BookList.css';

export default function CategoriesFilter({ categories, bookList, listBooks, array, filterBooks }) {
  const [searchTermCategories, setSearchTermCategories] = React.useState('');
  const [searchResultsCategories, setSearchResultsCategories] = React.useState([]);

  let arrayOfBooks = [];

  React.useEffect(() => {
    console.log(searchTermCategories);
    console.log(array, 'BEFORE');
    if (searchTermCategories) {
      if (array?.toString().includes(searchTermCategories.toString())) {
        array = array.filter((a) => a.toString() !== searchTermCategories.toString());
        //console.log(event);
        //console.log(array, '/////');
      } else {
        if (array[0] === '') {
          array[0] = searchTermCategories;
          //console.log(array, "00000");
        } else {
          array.push(searchTermCategories);
          //console.log(array);
        }
      }
    }

    console.log(array, 'NOT WORKING');
    const books = listBooks?.map((book) => {
      const categ = book.categories.map((cat) => {
        const arr = array.map((ar) => {
          if (ar.toString() === cat.NameOfTheCategory.toString()) {
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
        //console.log(filtered);
        return arr;
      });
      return categ;
    });

    const uniqueBooks = Array.from(new Set(arrayOfBooks)); // galutinai isfiltruota, sitas turime rodyti

    if (uniqueBooks.length !== 0) {
      //console.log(uniqueBooks); // rodomos galutines knygos
    }

    /*if (array.length !== 0 && uniqueBooks.length !== 0) {
      //setBookList(uniqueBooks);
    } */
    if (array.length === 0 && bookList.length !== 0) {
      //niekas nekeiciama ir rodoma bookList
      filterBooks(bookList);
    }

    setSearchResultsCategories(uniqueBooks);

    filterBooks(uniqueBooks);
  }, [searchTermCategories]);
  //console.log(array, 'OUTSIDE');

  if (categories.length === 0) {
    return null;
  } else {
    const categ = categories?.map((cat) => {
      return (
        <tr>
          <td>
            <label>
              <input
                type="checkbox"
                className="filterBox"
                value={cat.NameOfTheCategory || ' '}
                onChange={(e) => setSearchTermCategories(e.target.value)}
              />
              {cat.NameOfTheCategory}
            </label>
          </td>
        </tr>
      );
    });

    return <tbody className="categoriesDivBox">{categ}</tbody>;
  }
}