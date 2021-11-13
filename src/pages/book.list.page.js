import React from 'react';
import axios from 'axios';
import '../Styles/BookList.css';
import ReactPaginate from 'react-paginate';
import { useHistory } from 'react-router-dom';
import CategoriesFilter from '../components/CategoriesFilter';
import OneBookView from '../components/OneBookView';
import AuthContext from '../context/AuthContext';
import UserContext from '../context/UserContext';
import BASE_URL from '../config/IpAdress';
import '../Styles/LoginMobile.css';

const array = [];

const AllBooks = () => {
  const [listBooks, setListBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [viewCount, setViewCount] = React.useState(0);
  const [bookList, setBookList] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [categoriesArray, setCategoriesArray] = React.useState([]);
  const [authorsArray, setAuthorsArray] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [oneBook, setBook] = React.useState({});
  const [img, setImg] = React.useState('');
  const { addToWish, addComment } = React.useContext(AuthContext);
  const state = React.useContext(UserContext);

  const history = useHistory();

  React.useEffect(() => {
    let isUserPresent = false;
    axios
      .get(`${BASE_URL}/wish-lists`, {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      })
      .then(({ data }) => {
        data.forEach((item) => {
          if (item.UsersEmail === state.user?.email) {
            addToWish(item.ListOfBooks.arrayOfBooks);
            isUserPresent = true;
          }
        });
        if (!isUserPresent) {
          addToWish([]);
        }
      });
  }, []);

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
  }, [show]);

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
  }, [searchResults, searchTerm, categoriesArray, authorsArray]);

  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = React.useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleOnPress = (book) => {
    history.push(`/one-book-view/${book.id}`);

    if (book.PhotoOfTheBook?.name) {
      setImg(book.PhotoOfTheBook.name);
    } else {
      setImg('https://www.liweddings.com/themes/default/assets/images/no-image.png');
    }
    setShow(true);
    setBook(book);
    const comments = [];
    book.comments.forEach((item) => {
      comments.push(item.comment);
    });
    addComment(comments);
  };

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
                    <div className="bookImageDiv">
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
                <table className="filtersTable">
                  <CategoriesFilter
                    categories={categories}
                    bookList={bookList}
                    listBooks={listBooks}
                    array={array}
                    filterBooks={(e) => setBookList(e)}
                    categoriesArray={categoriesArray}
                    setCategoriesArray={(e) => setCategoriesArray(e)}
                    authors={authors}
                    authorsArray={authorsArray}
                    setAuthorsArray={(e) => setAuthorsArray(e)}
                  />
                  <br />
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
