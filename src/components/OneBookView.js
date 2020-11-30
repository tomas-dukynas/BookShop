import React, { useState } from 'react';
import '../Styles/ItemView.css';
import Modal from 'react-modal';
import ReactStars from 'react-rating-stars-component';
import AddViewCount from '../functions.item.view/addViewCount';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';
import SuccesModal from './SuccessModal';
import axios from 'axios';
import Spinner from './CheckoutForm';

const OneBookView = ({ book, viewCount, setShow, img }) => {
  const { addToCart, addToWish } = React.useContext(AuthContext);

  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);
  const [wishModalIsOpen, setWishModalIsOpen] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [rated, setRated] = useState(true);

  React.useEffect(() => {
    axios
      .get('http://localhost:1337/ratings')
      .then(({ data }) => {
        data.map((rating) => {
          if (rating.IdOfBook.toString() === book.id.toString()) {
            //console.log(rating);
            return setRatings(rating);
          }
        });
      })
      .catch((e) => console.log(e));
  }, []);

  let stars = (ratings.SumOfStars / ratings.NumberOfRatings).toFixed(2);

  if (isNaN(stars)) {
    stars = 0;
  }

  const ratingChanged = (newRating) => {
    //console.log(ratings);

    const increaseRatings = ratings?.NumberOfRatings;
    const increaseStars = ratings?.SumOfStars;
    setRated(false);

    const add = axios.put('http://localhost:1337/ratings/' + ratings.id, {
      NumberOfRatings: increaseRatings + 1,
      SumOfStars: increaseStars + newRating,
    })
      .finally(() => {
        //console.log("i should go second");
        axios
          .get('http://localhost:1337/ratings')
          .then(({ data }) => {
            data.map((rating) => {
              if (rating.IdOfBook.toString() === book.id.toString()) {
                //console.log("NEW",rating);
                return setRatings(rating);
              }
            });
          })
          .catch((e) => console.log(e));
      });


  };
  console.log(rated);
  return (
    <div className="uth-inner">
      <div className="toHide">
        <div>
          <SuccesModal
            modalIsOpen={cartModalIsOpen}
            setModalIsOpen={setCartModalIsOpen}
            text="Book was added to cart"
          />
          <SuccesModal
            modalIsOpen={wishModalIsOpen}
            setModalIsOpen={setWishModalIsOpen}
            text="Book was added to wishlist"
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
                  <div className="empty1">
                    {rated ? (
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={60}
                        isHalf={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                    ) : (
                      <ReactStars
                        count={5}
                        size={60}
                        isHalf={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
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
