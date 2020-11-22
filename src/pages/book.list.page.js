import React, { useEffect } from 'react';
import axios from 'axios';
import BooksList from '../components/BooksList';
import '../Styles/BookList.css';
import CategoriesFilter from '../components/CategoriesFilter';
import ReactDOM from 'react-dom';

let array = [];

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
        // console.log(data);
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
        person.Author.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.NameOfTheBook.toString().toLocaleLowerCase().includes(searchTerm.toLowerCase()),
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
  } else if (searchTerm.length === 0 && array.length === 0 && bookList.length === 0) {
    //setBookList(listBooks);
  }

  //console.log(array, "MAIN PAGE");

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>
              <div className="filters">
                <table>
                  <CategoriesFilter
                    categories={categories}
                    bookList={bookList}
                    listBooks={listBooks}
                    array={array}
                    filterBooks={(e) => setBookList(e)}
                  />
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
