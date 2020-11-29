import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ItemView.css';
import AddViewCount from '../functions.item.view/addViewCount';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';
import SuccessModal from './SuccessModal';
import UserContext from '../context/UserContext';
import BASE_URL from '../config/IpAdress';
import CommentList from './CommentList';
import CommentsInput from './CommentsInput';

const OneBookView = ({ book, viewCount, setShow, img }) => {
  const { addToCart, addToWish, addComment } = React.useContext(AuthContext);
  const state = React.useContext(UserContext);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [wishModalIsOpen, setWishModalIsOpen] = useState(false);
  const [fullWishModalIsOpen, setFullWishModalIsOpen] = useState(false);
  const [wishAlreadyModalIsOpen, setWishAlreadyModalIsOpen] = useState(false);

  // eslint-disable-next-line no-shadow
  const handleWishPress = async (book) => {
    if (state.wish.length >= 5) {
      setFullWishModalIsOpen(true);
    } else {
      let wishId = null;
      let contains = false;
      await axios
        .get(`${BASE_URL}/wish-lists`, {
          headers: {
            Authorization: `Bearer ${state.user?.token}`,
          },
        })
        .then(({ data }) => {
          console.log(data);
          data.forEach((item) => {
            if (item.UsersEmail === state.user?.email) {
              contains = true;
              wishId = item.id;
            }
          });
        })
        .catch((e) => console.log(e));

      if (!contains) {
        const response = await axios.post(
          `${BASE_URL}/wish-lists`,
          {
            ListOfBooks: { arrayOfBooks: [book] },
            UsersEmail: state.user?.email,
            user: state.user?.email,
          },
          {
            headers: {
              Authorization: `Bearer ${state.user?.token}`,
            },
          },
        );
        setWishModalIsOpen(true);
      } else {
        const newWish = state.wish;
        let contain = false;
        state.wish.forEach((item) => {
          if (book.id === item.id) {
            contain = true;
            setWishAlreadyModalIsOpen(true);
          }
        });

        if (!contain) {
          newWish.push(book);
          setWishModalIsOpen(true);
          addToWish(newWish);
        }
        await axios.put(
          `${BASE_URL}/wish-lists/${wishId}`,
          {
            ListOfBooks: { arrayOfBooks: state.wish },
            UsersEmail: state.user?.email,
            user: state.user?.email,
          },
          {
            headers: {
              Authorization: `Bearer ${state.user?.token}`,
            },
          },
        );
      }
    }
  };

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
          <SuccessModal
            modalIsOpen={fullWishModalIsOpen}
            setModalIsOpen={setFullWishModalIsOpen}
            text="Your wishlist is full, maximum 5 items"
            handleModalClose={() => setFullWishModalIsOpen(false)}
          />
          <SuccessModal
            modalIsOpen={wishAlreadyModalIsOpen}
            setModalIsOpen={setWishAlreadyModalIsOpen}
            text="Your wishlist already has this item"
            handleModalClose={() => setWishAlreadyModalIsOpen(false)}
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
                  {state.user && <CommentsInput bookId={book.id} />}
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
                            {state.user && (
                              <button
                                type="button"
                                className="buttonAdd"
                                onClick={() => handleWishPress(book)}
                              >
                                Add to wishlist
                              </button>
                            )}
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
                  <CommentList comments={book.comments} />
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
