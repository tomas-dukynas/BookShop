import React, { useState } from 'react';
import '../Styles/ItemView.css';
import Modal from 'react-modal';
import AddViewCount from '../functions.item.view/addViewCount';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';


const OneBookView = ({ book, viewCount, setShow, img }) => {
  const { addToCart } = React.useContext(AuthContext);


  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className="uth-inner">


      <div className="toHide">

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          ariaHideApp={false}
          className="popup"
        >
          <h2 className="popupH2"> Added to cart</h2>
          <button type="button" onClick={() => setModalIsOpen(false)} className="buttonClose">
            Close
          </button>
        </Modal>
      </div>
      <AddViewCount ViewCount={viewCount} id={book.id} />
      <button type="button" className="buttonAdd" onClick={() => setShow(false)}>
        Go back
      </button>
      <div className="bookAuthor">
        {book.Author} - {book.NameOfTheBook}
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <div className="leftSide">
                <div className="mainBox">
                  <Image img={img} />
                </div>
                <div className="empty1" />
              </div>
            </th>
            <th>
              <div className="rightSide">
                <h4 className="price">{book.Price}€</h4>
                <form>
                  <table className="table1">
                    <thead>
                      <tr>
                        <th>
                          <input type="number" className="number" min="1" defaultValue="1" />
                        </th>
                        <th>
                          <button
                            type="button"
                            className="buttonAdd"
                            onClick={() => {
                              setModalIsOpen(true);
                              addToCart(book);
                            }}
                          >
                            Add to cart
                          </button>
                        </th>
                      </tr>
                    </thead>
                  </table>
                </form>
                <div className="descriptionDiv">
                  <p className="description">Categories:</p>
                  <BookCategories categories1={book.categories} className="description" />
                  <p className="description">Description:</p>
                  <BookDescription description={book.Description} />

                </div>
              </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    </div>


  );
};

export default OneBookView;
