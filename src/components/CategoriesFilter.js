import React from 'react';

import '../Styles/BookList.css';

function SetState(searchTermCategories, categoriesArray, setCategoriesArray) {
  if (searchTermCategories) {
    if (categoriesArray.toString().includes(searchTermCategories.toString())) {
      let ArrCat = categoriesArray.filter((a) => a.toString() !== searchTermCategories.toString());
      setCategoriesArray(ArrCat);
      console.log('REMOVED');
    } else {
      if (categoriesArray[0] === '') {
        setCategoriesArray(searchTermCategories);
      } else {
        let ArrCat = categoriesArray;
        ArrCat.push(searchTermCategories);
        setCategoriesArray(ArrCat);
      }
    }
  }
  return categoriesArray;
}

export default function CategoriesFilter({
  categories,
  bookList,
  listBooks,
  array,
  filterBooks,
  categoriesArray,
  setCategoriesArray,
}) {

  const [searchTermCategories, setSearchTermCategories] = React.useState('');

  let arrayOfBooks = [];

  React.useEffect(() => {
    SetState(searchTermCategories, categoriesArray, setCategoriesArray);
  }, [searchTermCategories]);

  React.useEffect(() => {
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

        return arr;
      });
      return categ;
    });

    const uniqueBooks = Array.from(new Set(arrayOfBooks));

    console.log(uniqueBooks);

    if (categoriesArray?.length === 0 && bookList.length !== 0) {
      filterBooks(bookList);
    }

    if (uniqueBooks.length !== 0) {
      filterBooks(uniqueBooks);
    }

    filterBooks(uniqueBooks);
  }, [searchTermCategories]);

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
