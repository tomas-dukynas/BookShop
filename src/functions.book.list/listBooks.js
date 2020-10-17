import React from 'react';

import ItemView from '../pages/item.view.page';

export default function ListBooks({book}) {
  console.log(book);
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
                  <button type="button" className="buttonViewMore" onClick={() => ItemView(book.id)}>
                    View More
                  </button>
                </div>
              </th>
            </tr>
            </thead>
          </table>
        </div>
      </li>
    );
  });

  return(
  <ln>{listItems}</ln>
  );
}
