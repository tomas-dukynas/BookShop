import React from 'react';
import '../Styles/BookList.css';

export default function AuthorsFilter({
  authors,
  bookList,
  filterBooks,
  authorsArray,
  setAuthorsArray,
}) {
  const [searchTermAuthors, setSearchTermAuthors] = React.useState('');

  const arrayOfBooks = [];

  const OnCheckBoxPress = (value) => {
    setSearchTermAuthors(value);

    if (value) {
      if (authorsArray?.toString().includes(value.toString())) {
        const ArrAut = authorsArray.filter((a) => a.toString() !== value.toString());
        setAuthorsArray(ArrAut);
      } else if (authorsArray[0] === '') {
        setAuthorsArray(value);
      } else {
        const ArrAut = authorsArray;
        ArrAut.push(value);
        setAuthorsArray(ArrAut);
      }
    }
  };

  React.useEffect(() => {
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

  return (
    <tbody className="categoriesDivBox">
      {authors?.map((aut) => {
        return (
          <tr>
            <td>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
      })}
    </tbody>
  );
}
