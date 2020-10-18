import React from 'react';
import '../Styles/BookList.css';
import OneBookView from './OneBookView';

export default function BooksList({ books, categories, viewCount }) {
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [img, setImg] = React.useState('');
  const [price, setPrice] = React.useState(null);
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');

  const handleOnPress = (book) => {
    setShow(true);
    setId(book.id);
    setImg(book.PhotoOfTheBook.name);
    setPrice(book.Price);
    setAuthor(book.Author);
    setDescription(book.Description);
    setName(book.NameOfTheBook);
  };

  const listItems = books.map((book) => {
    return (
      <div className="mainDiv" key={book.id}>
        <li>
          <div className="cardDiv">
            <table>
              <thead>
                <tr>
                  <th>
                    <div>
                      <img src={book.PhotoOfTheBook.name} alt="" className="bookImageCard" />
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
  return (
    <OneBookView
      id={id}
      img={img}
      price={price}
      author={author}
      description={description}
      name={name}
      categories={categories}
      viewCount={viewCount}
      setShow={setShow}
    />
  );
}
