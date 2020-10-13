import React from 'react';
import '../Styles/ItemView.css';
import axios from 'axios';
/* eslint-disable react/destructuring-assignment */

import DataBook from '../functions.item.view/dataBook';
import AddViewCount from '../functions.item.view/addViewCount';
import DataCategories from '../functions.item.view/dataCategories';
import DataPrice from '../functions.item.view/dataPrice';
import GetImage from '../functions.item.view/getImage';
import DataDescription from '../functions.item.view/dataDescription';
import Book from '../functions.item.view/templateBook';
import Categories from '../functions.item.view/templateCategories';
import ViewCount from '../functions.item.view/templateViewCount';

class ItemView extends React.Component {
  state = {
    Book,
    Categories,
    ViewCount,
  };

  async componentDidMount() {
    const productRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/books',
    });
    const productCategories = await axios({
      method: 'GET',
      url: 'http://localhost:1337/categories',
    });
    const increaseView = await axios({
      method: 'GET',
      url: 'http://localhost:1337/Book-Counts',
    });
    console.log('App.res ', productRes);
    // eslint-disable-next-line no-shadow
    const Book = productRes.data;
    // eslint-disable-next-line no-shadow
    const Categories = productCategories.data;
    // eslint-disable-next-line no-shadow
    const ViewCount = increaseView.data;
    this.setState({ Book, Categories, ViewCount });
  }

  render() {
    return (
      <div className="uth-inner">
        <AddViewCount ViewCount={this.state.ViewCount} />
        <table>
          <thead>
            <tr>
              <th>
                <div className="leftSide">
                  <div className="nameDiv">
                    <DataBook Book={this.state.Book} className="bookAuthor" />
                  </div>
                  <div className="mainBox">
                    <GetImage Book={this.state.Book} className="bookImage" />
                  </div>
                  <div className="empty1" />
                </div>
              </th>
              <th>
                <div className="rightSide">
                  <DataPrice Book={this.state.Book} className="price" />
                  <table className="table1">
                    <thead>
                      <tr>
                        <th>
                          <form>
                            <input type="number" className="number" min="1" defaultValue="1" />
                          </form>
                        </th>
                        <th>
                          <button type="button" className="buttonAdd">
                            Add to cart
                          </button>
                        </th>
                      </tr>
                    </thead>
                  </table>
                  <div className="descriptionDiv">
                    <p className="description">Categories:</p>

                    <DataCategories Categories={this.state.Categories} className="description" />
                    <p className="description">Description:</p>
                    <DataDescription Book={this.state.Book} className="categories" />
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}

export default ItemView;
