import React from 'react';
import '../Styles/BookList.css';
import OneBookView from './OneBookView';

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
    console.log(book);
  };

  const listItems = books.map((book) => {
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
