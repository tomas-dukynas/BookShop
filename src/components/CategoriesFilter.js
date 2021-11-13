import React from 'react';
import '../Styles/BookList.css';

export default function CategoriesFilter({
  categories,
  bookList,
  filterBooks,
  categoriesArray,
  setCategoriesArray,
}) {
  const [searchTermCategories, setSearchTermCategories] = React.useState('');

  const arrayOfBooks = [];

  const OnCheckBoxPress = (value) => {
    setSearchTermCategories(value);

    if (categoriesArray.toString().includes(value.toString())) {
      const ArrCat = categoriesArray.filter((a) => a.toString() !== value.toString());
      setCategoriesArray(ArrCat);
    } else if (categoriesArray[0] === '') {
      setCategoriesArray(value);
    } else {
      const ArrCat = categoriesArray;
      ArrCat.push(value);
      setCategoriesArray(ArrCat);
    }
  };

  React.useEffect(() => {
    const uniqueBooks = Array.from(new Set(arrayOfBooks));

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
  }

  return (
    <tbody className="categoriesDivBox">
      {categories?.map((cat) => (
        <tr>
          <td>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <input
                type="checkbox"
                className="filterBox"
                value={cat.NameOfTheCategory || ' '}
                onChange={(e) => OnCheckBoxPress(e.target.value)}
              />
              {cat.NameOfTheCategory}
            </label>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
