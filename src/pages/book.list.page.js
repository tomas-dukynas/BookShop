import React, { useEffect } from 'react';
import axios from 'axios';
import BooksList from '../components/BooksList';
import '../Styles/BookList.css';
import ReactDOM from 'react-dom';

const AllBooks = () => {
  const [listBooks, setListBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [viewCount, setViewCount] = React.useState(0);

  const [bookList, setBookList] = React.useState([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:1337/books')
      .then(({ data }) => {
        setListBooks(data);
        setBookList(data);
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/categories')
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/Book-Counts')
      .then(({ data }) => {
        setViewCount(data);
        //console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results = listBooks?.filter(
      (person) =>
        person.Author.toString().toLowerCase().includes(searchTerm) ||
        person.NameOfTheBook.toString().toLocaleLowerCase().includes(searchTerm),
    );

    setSearchResults(results);
  }, [searchTerm]);

  if (
    searchTerm.length !== 0 &&
    listBooks !== bookList &&
    searchResults !== bookList &&
    searchResults.length === 0
  ) {
    setBookList(searchResults);
  } else if (searchResults.length !== 0 && searchResults !== bookList) {
    setBookList(searchResults);
  }

  let array = [];

  const Categ = ({ categories }) => {
    const [searchTermCategories, setSearchTermCategories] = React.useState('');
    const [searchResultsCategories, setSearchResultsCategories] = React.useState([]);
    let arrayOfBooks = [];
    /*
    React.useEffect((event) => {
      console.log(event);
      //setSearchTermCategories(event.target.value);
    }, [searchTermCategories]);*/

    const handleChangeCategories = (event) => {
      //console.log(event);
      setSearchTermCategories(event.target.value);

      if (array.includes(searchTermCategories)) {
        array = array.filter((a) => a.toString() !== searchTermCategories.toString());
      } else {
        if (array[0] === '') {
          array[0] = searchTermCategories;
        } else {
          array.push(searchTermCategories);
        }
      }
    };

    React.useEffect(() => {
      const books = bookList.map((book) => {
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
        console.log(uniqueBooks); // rodomos galutines knygos
      }

      if (array.length !== 0 && uniqueBooks.length !== 0) {
        //setBookList(uniqueBooks);
      } else if (array.length === 0 && bookList.length !== 0) {
        //niekas nekeiciama ir rodoma bookList
      }

      setSearchResultsCategories(uniqueBooks);
    }, [searchTermCategories]);

    if (categories.length === 0) {
      return null;
    } else {
      const categ = categories?.map((cat) => {
        return (
          <tr>
            <td>
              <input
                type="checkbox"
                className="filterBox"
                value={cat.NameOfTheCategory || ' '}
                onChange={handleChangeCategories}
              />
              {cat.NameOfTheCategory}
            </td>
          </tr>
        );
      });

      return <div className="categoriesDivBox">{categ}</div>;
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <div className="filters">
                <table>
                  <tbody>
                    <Categ categories={categories} />
                  </tbody>
                </table>
              </div>
            </th>
            <th>
              <div className="mainBOXLIST">
                <div className="searchDiv">
                  <input
                    className="searchField"
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <BooksList books={bookList} categories={categories} viewCount={viewCount} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default AllBooks;
