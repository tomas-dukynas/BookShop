import React, {useState} from 'react';
import '../Styles/BookList.css';
import OneBookView from './OneBookView';

export default function BooksList({ books, categories, viewCount, number }) {
  const [show, setShow] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [img, setImg] = React.useState('');
  const [price, setPrice] = React.useState(null);
  const [author, setAuthor] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState('');
  const [categories1, setCategories1] = React.useState('');
  //const [categories2, setCategories2] = React.useState('');
  //const [quantity,setNumber] = React.useState('');

  const handleOnPress = (book) => {
    setShow(true);
    setId(book.id);
    if(book.PhotoOfTheBook?.name){
      setImg(book.PhotoOfTheBook.name);
    }
    else {
      setImg("https://www.liweddings.com/themes/default/assets/images/no-image.png");
    }
    setPrice(book.Price);
    setAuthor(book.Author);
    setDescription(book.Description);
    setName(book.NameOfTheBook);
    setCategories1(book.categories); //[0].NameOfTheCategory);
    //console.log(book.Author);
    /*const good = number.map((num) => {
      if(num.id === book.id){
        setNumber(num.number);
        console.log(num.number, " num.number");
        return num
      }
      else return null
    });*/

    //setNumber(good);
    //console.log(good)
  };

  const listItems = books.map((book) => {
    let imgURL = book.PhotoOfTheBook?.name;
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
  return (
    <OneBookView
      id={id}
      img={img}
      price={price}
      author={author}
      description={description}
      name={name}
      categories1={categories1}
      viewCount={viewCount}
      setShow={setShow}
      //number={number}
      //quantity={quantity}
    />
  );
}
