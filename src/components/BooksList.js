import React from 'react';
import '../Styles/BookList.css';
import OneBookView from './OneBookView';
import ReactPaginate from "react-paginate";


export default function BooksList({ books, categories, viewCount, number }) {
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

  const listItems = books?.map((book) => {


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

  if (!show) {
    return <ul>{listItems}</ul>;
  }
  return <OneBookView book={oneBook} viewCount={viewCount} setShow={setShow} img={img} />;
}

/*
const BookList = ({ books, categories, viewCount, number }) => {
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

  const listItems = books?.map((book) => {
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

  /*const PER_PAGE = 3;
  const [currentPage, setCurrentPage] = React.useState(0);
  //const [data, setData] = React.useState([]);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  /*const currentPageData = listBooks
    .slice(offset, offset + PER_PAGE)
    .map((boo) => <h3> {boo.NameOfTheBook} </h3>);*/
  /*const currentPageData = listItems?.slice(offset, offset + PER_PAGE);
  //.map((Boo) => <Boo/>);

  const pageCount = Math.ceil(currentPageData?.length / PER_PAGE);*/
/*
  if (!show) {
    return (<ul>{listItems}</ul>);

  }
  return <OneBookView book={oneBook} viewCount={viewCount} setShow={setShow} img={img} />;

};
export default BookList;
*/
{/*<div>

        <div className="paginatorList">{currentPageData}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
  );*/}