import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/ItemView.css';
import ReactStars from 'react-rating-stars-component';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';
import SuccessModal from './SuccessModal';
import UserContext from '../context/UserContext';
import BASE_URL from '../config/IpAdress';
import CommentList from './CommentList';
import CommentsInput from './CommentsInput';
import '../Styles/LoginMobile.css';
import ShareModal from './ShareModal';

const OneBookView = (id) => {
  const { addToCart, addToWish } = React.useContext(AuthContext);
  const state = React.useContext(UserContext);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [wishModalIsOpen, setWishModalIsOpen] = useState(false);
  const [fullWishModalIsOpen, setFullWishModalIsOpen] = useState(false);
  const [wishAlreadyModalIsOpen, setWishAlreadyModalIsOpen] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState(true);

  const [img, setImg] = React.useState('');
  const [modalIsOpenS, setModalIsOpenS] = useState(false);

  const [book, setBook] = useState('');
  const { addComment } = React.useContext(AuthContext);
  const [bookLoaded, setBookLoaded] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    axios
      .get(`http://localhost:1337/books/${id.match.params.id}`)
      .then(({ data }) => {
        setBook(data);

        if (data.PhotoOfTheBook?.name) {
          setImg(data.PhotoOfTheBook.name);
        } else {
          setImg('https://www.liweddings.com/themes/default/assets/images/no-image.png');
        }
        const comments = [];
        data.comments.forEach((item) => {
          comments.push(item.comment);
        });
        addComment(comments);

        setBookLoaded(true);
      })
      .catch((e) => {
        throw new Error(e);
      })
      .finally(() => {
        setBookLoaded(true);
      });
  }, []);

  const handleWishPress = async (_book) => {
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
          data.forEach((item) => {
            if (item.UsersEmail === state.user?.email) {
              contains = true;
              wishId = item.id;
            }
          });
        })
        .catch((e) => {
          throw new Error(e);
        });

      if (!contains) {
        await axios.post(
          `${BASE_URL}/wish-lists`,
          {
            ListOfBooks: { arrayOfBooks: [_book] },
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
          if (_book.id === item.id) {
            contain = true;
            setWishAlreadyModalIsOpen(true);
          }
        });

        if (!contain) {
          newWish.push(_book);
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

  React.useEffect(() => {
    axios
      .get('http://localhost:1337/ratings')
      .then(({ data }) => {
        data.forEach((rating) => {
          if (rating.IdOfBook.toString() === book.id.toString()) {
            setRatings(rating);
          }
        });
      })
      .catch((e) => {
        throw new Error(e);
      });
  }, [book]);

  let stars = (ratings.SumOfStars / ratings.NumberOfRatings).toFixed(2);

  if (typeof stars !== 'number') {
    stars = 0;
  }

  const onRatingsChanged = (newRating) => {
    setRated(false);
    const increaseRatings = ratings?.NumberOfRatings;
    const increaseStars = ratings?.SumOfStars;

    axios
      .put(`http://localhost:1337/ratings/${ratings.id}`, {
        NumberOfRatings: increaseRatings + 1,
        SumOfStars: increaseStars + newRating,
      })
      .finally(() => {
        axios
          .get('http://localhost:1337/ratings')
          .then(({ data }) => {
            data.forEach((rating) => {
              if (rating.IdOfBook.toString() === book.id.toString()) {
                setRatings(rating);
              }
            });
          })
          .catch((e) => {
            throw new Error(e);
          });
      });
  };

  const goBack = () => {
    history.push('/list-view');
  };

  return (
    <div>
      {!bookLoaded ? (
        <Spinner animation="border" className="spinner" />
      ) : (
        <div className="uth-inner">
          <div className="toHide">
            <div className="infoModals">
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

              <ShareModal
                book={book}
                modalIsOpenS={modalIsOpenS}
                setModalIsOpenS={setModalIsOpenS}
                handleModalClose={() => setModalIsOpenS(false)}
              />
            </div>
            <button type="button" className="buttonAdd" onClick={goBack}>
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
                      <div className="commentInput">
                        {state.user && <CommentsInput bookId={book.id} />}
                      </div>
                      <div className="empty1">
                        {rated ? (
                          <ReactStars
                            count={5}
                            onChange={onRatingsChanged}
                            size={60}
                            isHalf={false}
                            emptyIcon={<i className="far fa-star" />}
                            halfIcon={<i className="fa fa-star-half-alt" />}
                            fullIcon={<i className="fa fa-star" />}
                            activeColor="#ffd700"
                          />
                        ) : (
                          <ReactStars
                            count={5}
                            size={60}
                            isHalf={false}
                            emptyIcon={<i className="far fa-star" />}
                            halfIcon={<i className="fa fa-star-half-alt" />}
                            fullIcon={<i className="fa fa-star" />}
                            activeColor="#ffd700"
                            value={stars}
                            edit={rated}
                          />
                        )}

                        <p>
                          {stars} stars (total of {ratings.NumberOfRatings} ratings)
                        </p>
                      </div>
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
                                <div className="buttonAddDiv">
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
                                    <div>
                                      <button
                                        type="button"
                                        className="buttonAdd"
                                        onClick={() => handleWishPress(book)}
                                      >
                                        Add to wishlist
                                      </button>
                                      <button
                                        type="button"
                                        className="buttonAdd"
                                        onClick={() => setModalIsOpenS(true)}
                                      >
                                        Share
                                      </button>
                                    </div>
                                  )}
                                </div>
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
                      <div className="commentsDiv">
                        <CommentList comments={book.comments} />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneBookView;
