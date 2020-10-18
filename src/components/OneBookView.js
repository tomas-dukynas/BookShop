import React from 'react';
import '../Styles/ItemView.css';
import AddViewCount from '../functions.item.view/addViewCount';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';

const OneBookView = ({ id, img, price, author, description, name, categories, viewCount }) => {
  const { addToCart } = React.useContext(AuthContext);

  const addToShoppingBag = () => {
    addToCart(id);
  };

  return (
    <div className="uth-inner">
      <AddViewCount ViewCount={viewCount} />
      <table>
        <thead>
          <tr>
            <th>
              <div className="leftSide">
                <div className="nameDiv">{author}</div>
                <div className="bookName">{name}</div>
                <div className="mainBox">
                  <Image img={img} />
                </div>
                <div className="empty1" />
              </div>
            </th>
            <th>
              <div className="rightSide">
                {price}€
                <table className="table1">
                  <thead>
                    <tr>
                      <th>
                        <form>
                          <input type="number" className="number" min="1" defaultValue="1" />
                        </form>
                      </th>
                      <th>
                        <button type="button" className="buttonAdd" onClick={addToShoppingBag}>
                          Add to cart
                        </button>
                      </th>
                    </tr>
                  </thead>
                </table>
                <div className="descriptionDiv">
                  <p className="description">Categories:</p>
                  <BookCategories categories={categories} className="description" />
                  <p className="description">Description:</p>
                  <BookDescription description={description} />
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default OneBookView;
