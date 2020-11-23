import React, { useState } from 'react';
import '../Styles/ItemView.css';
import AddViewCount from '../functions.item.view/addViewCount';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';
import SuccessModal from './SuccessModal';

const OneBookView = ({ book, viewCount, setShow, img }) => {
  const { addToCart, addToWish } = React.useContext(AuthContext);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [wishModalIsOpen, setWishModalIsOpen] = useState(false);

  return (
    <div className="uth-inner">
      <div className="toHide">
        <div>
          <SuccessModal
            modalIsOpen={cartModalIsOpen}
            setModalIsOpen={setCartModalIsOpen}
            text="Book was added to cart"
            handleModalClose={() => setCartModalIsOpen(false)}
          />
          <SuccessModal
            modalIsOpen={wishModalIsOpen}
            setModalIsOpen={setWishModalIsOpen}
            text="Book was added to wishlist"
            handleModalClose={() => setWishModalIsOpen(false)}
          />
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
                                setCartModalIsOpen(true);
                                addToCart(book);
                              }}
                            >
                              Add to cart
                            </button>
                            <button
                              type="button"
                              className="buttonAdd"
                              onClick={() => {
                                setWishModalIsOpen(true);
                                addToWish(book);
                              }}
                            >
                              Add to wishlist
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
