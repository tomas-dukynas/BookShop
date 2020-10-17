import React from 'react';
import '../Styles/BookList.css';
import axios from 'axios';

//import ItemView from 'item.view.page';


//import ListBooks from '../functions.book.list/listBooks';  // mapinimo funkcija



const AllBooks = () => {

  const [book, setBook] = React.useState([]);

  axios
    .get('http://localhost:1337/books')
    .then(({ data }) => {
      setBook(data)

    })
    .catch((e) => console.log(e));


  const listItems = book.map((book) =>{
    return (
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
                  <button type="button" className="buttonViewMore" onClick={() => console.log(book.id)}>
                    View More
                  </button>
                  {/*<button type="button" className="buttonViewMore" onClick={() => ItemView(book.id)}>*/}
                    {/*View More*/}
                  {/*</button>*/}
                </div>
              </th>
            </tr>
            </thead>
          </table>
        </div>
      </li>
    );
  });

  return (
    <div className="mainDiv">
      <ul>{listItems}</ul>

      {/*<ListBooks Book={book} />    // mapinimas */}
    </div>

  );
};


export default AllBooks;