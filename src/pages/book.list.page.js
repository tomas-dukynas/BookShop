import React from 'react';
import axios from 'axios';
import '../Styles/BookList.css';
import ReactPaginate from 'react-paginate';
import CategoriesFilter from '../components/CategoriesFilter';
import AuthorsFilter from '../components/AuthorsFilter';
import OneBookView from '../components/OneBookView';

const array = [];

const AllBooks = () => {
  const [listBooks, setListBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [viewCount, setViewCount] = React.useState(0);

  const [bookList, setBookList] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [categoriesArray, setCategoriesArray] = React.useState([]);
  const [authorsArray, setAuthorsArray] = React.useState([]);

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
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/authors')
      .then(({ data }) => {
        setAuthors(data);
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

  React.useEffect(() => {
    if (
      searchTerm.length !== 0 &&
      listBooks !== bookList &&
      searchResults !== bookList &&
      searchResults.length === 0
    ) {
      setBookList(searchResults);
    } else if (searchResults.length !== 0 && searchResults !== bookList) {
      setBookList(searchResults);
    } else if (
      searchTerm.length === 0 &&
      categoriesArray.length === 0 &&
      bookList !== listBooks &&
      authorsArray.length === 0
    ) {
      setBookList(listBooks);
    }
    // console.log(authorsArray, 'AUTHORS ARRAY');
  }, [searchResults, searchTerm, categoriesArray, authorsArray]);

  // console.log(categoriesArray, 'CATEG ARRAY');

  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = React.useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const [show, setShow] = React.useState(false);
  const [oneBook, setBook] = React.useState({});
  const [img, setImg] = React.useState('');

  const handleOnPress = (book) => {
    if (book.PhotoOfTheBook?.name) {
      setImg(book.PhotoOfTheBook.name);
    } else {
      setImg('https://www.liweddings.com/themes/default/assets/images/no-image.png');
    }
    setShow(true);
    setBook(book);
  };

  if (
    searchTerm.length !== 0 &&
    listBooks !== bookList &&
    searchResults !== bookList &&
    searchResults.length === 0
  ) {
    setBookList(searchResults);
  } else if (searchResults.length !== 0 && searchResults !== bookList) {
    setBookList(searchResults);
  } else if (
    searchTerm.length === 0 &&
    array.length === 0 &&
    bookList.length === 0 &&
    bookList !== listBooks
  ) {
    setBookList(listBooks);
  }

  const offset = currentPage * PER_PAGE;
  const currentPageData = bookList.slice(offset, offset + PER_PAGE).map((book) => {
    const imgURL = book.PhotoOfTheBook?.name;

    return (
      <div className="mainDiv" key={book.id}>
        <li>
          <div className="cardDiv">
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      <img src={imgURL} alt="" className="bookImageCard" />
                    </div>
                  </th>
                  <th>
                    <div className="nameDivCard">
                      <h4>{book.Author}</h4>
                      <h4>{book.NameOfTheBook}</h4>
                    </div>
                  </th>
                  <th>
                    <div className="priceDivCard">
                      <h4>{book.Price} €</h4>
                      <button
                        type="button"
                        className="buttonViewMore"
                        onClick={() => handleOnPress(book)}
                      >
                        View More
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </li>
      </div>
    );
  });



  const pageCount = Math.ceil(bookList.length / PER_PAGE);

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
                    categoriesArray={categoriesArray}
                    setCategoriesArray={(e) => setCategoriesArray(e)}
                  />
                  <br />
                  <AuthorsFilter
                    authors={authors}
                    bookList={bookList}
                    listBooks={listBooks}
                    array={array}
                    filterBooks={(e) => setBookList(e)}
                    authorsArray={authorsArray}
                    setAuthorsArray={(e) => setAuthorsArray(e)}
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
                  <h3 className="noBooks">No Books To Display</h3>
                </div>
                <div>
                  {!show ? (
                    <div className="paginatorList">
                      {currentPageData}

                      <ReactPaginate
                        previousLabel="← Previous"
                        nextLabel="Next →"
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName="pagination"
                        previousLinkClassName="pagination__link"
                        nextLinkClassName="pagination__link"
                        disabledClassName="pagination__link--disabled"
                        activeClassName="pagination__link--active"
                      />
                    </div>
                  ) : (
                    <OneBookView book={oneBook} viewCount={viewCount} setShow={setShow} img={img} />
                  )}
                  {/* <BooksList books={bookList} categories={categories} viewCount={viewCount} /> */}
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
