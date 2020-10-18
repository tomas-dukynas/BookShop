import React from 'react';
import '../Styles/ItemView.css';
import axios from 'axios';
/* eslint-disable react/destructuring-assignment */

//import id from 'book.list.page';

import DataBook from '../functions.item.view/dataBook';
import AddViewCount from '../functions.item.view/addViewCount';
import DataCategories from '../functions.item.view/dataCategories';
import DataPrice from '../functions.item.view/dataPrice';
import GetImage from '../functions.item.view/getImage';
import DataDescription from '../functions.item.view/dataDescription';
import Book from '../functions.item.view/templateBook';
import Categories from '../functions.item.view/templateCategories';
import ViewCount from '../functions.item.view/templateViewCount';
import ShoppingBag from '../components/ShoppingBag';
import AuthContext from '../context/AuthContext';

const ItemView = () => {
  const { addToCart } = React.useContext(AuthContext);
  const [book, setBook] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [viewCount, setViewCount] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('http://localhost:1337/books')
      .then(({ data }) => {
        setBook(data);
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/categories')
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/Book-Counts')
      .then(({ data }) => {
        setViewCount(data);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log('Book', book[0]);
  const addToShoppingBag = () => {
    const { id } = book[0];
    addToCart(id);
  };
  if (book === []) {
    return <div>Loading...</div>;
  }
  return (
    <div className="uth-inner">
      <AddViewCount ViewCount={viewCount} />
      <table>
        <thead>
          <tr>
            <th>
              <div className="leftSide">
                <div className="nameDiv">
                  <DataBook Book={book} className="bookAuthor" />
                </div>
                <div className="mainBox">
                  <GetImage Book={book} />
                </div>
                <div className="empty1" />
              </div>
            </th>
            <th>
              <div className="rightSide">
                <DataPrice Book={book} className="price" />
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

                  <DataCategories Categories={categories} className="description" />
                  <p className="description">Description:</p>
                  <DataDescription Book={book} className="categories" />
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ItemView;
