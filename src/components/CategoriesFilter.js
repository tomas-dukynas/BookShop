import React from 'react';
import '../Styles/BookList.css';


export default function CategoriesFilter({
  categories,
  bookList,
  listBooks,
  array,
  filterBooks,
  categoriesArray,
  setCategoriesArray,
}) {
  const [searchTermCategories, setSearchTermCategories] = React.useState(false);

  let arrayOfBooks = [];



  const OnCheckBoxPress = (value) => {
    //console.log(value, " FUN");

    setSearchTermCategories(value);

    if(value.toString()==='all')
    {
      filterBooks(listBooks);
      setCategoriesArray(true);
    }
    else {

      if(categoriesArray===true){
        setCategoriesArray(false)
      }



      //React.useEffect(() => {
      /* const books = listBooks?.map((book) => {
         return book.categories.map((cat) => {
           const arr = categoriesArray.map((ar) => {
             if (value.toString() === cat.NameOfTheCategory.toString()) {
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
           // console.log(filtered);
           return arr;
         });
       });*/
      /*
       const books = listBooks?.map((book) => {
         return book.categories.map((cat) => {
           const arr = categoriesArray.map((ar) => {
             if (value.toString() === cat.NameOfTheCategory.toString()) {
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
           // console.log(filtered);
           return arr;
         });
       });*/

      const boo = bookList?.map((book) => {
        return book.categories?.map((cat) => {
          if (value.toString() === cat.NameOfTheCategory.toString()) {
            if (arrayOfBooks[0] === null || arrayOfBooks[0] === book) {
              arrayOfBooks[0] = book;
            } else {
              arrayOfBooks.push(book);
            }
          }
        })
      });



      const uniqueBooks = Array.from(new Set(arrayOfBooks));
/*
      arrayOfBooks=[];
      const bo = uniqueBooks?.map((book) => {
        const li = bookList?.map((book1) => {
          if(book === book1) {
            if (arrayOfBooks[0] === null || arrayOfBooks[0] === book) {
              arrayOfBooks[0] = book;
            } else {
              arrayOfBooks.push(book);
            }
          }
        })
      });
*/

      filterBooks(uniqueBooks);
      //filterBooks(arrayOfBooks);
    }
  };
  //}, [searchTermCategories]);

  if (categories.length === 0) {
    return null;
  }
  const categ = categories?.map((cat) => {
    return (
      <tr>
        <td>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>
            <input
              type="radio"
              className="filterBox"
              value={cat.NameOfTheCategory || ' '}
              name="categories"

              onChange={(e) => OnCheckBoxPress(e.target.value)}


            />
            {cat.NameOfTheCategory}
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
              name="categories"

              onChange={(e) => OnCheckBoxPress(e.target.value)}


            />
            All
          </label>
        </td>
      </tr>
      {categ}
  </tbody>
  ) ;
}
