import React from 'react';
import '../Styles/ItemView.css';
import axios from 'axios';

import DataBook from '../functions.item.view/dataBook.js';
import AddViewCount from "../functions.item.view/addViewCount.js";
import DataCategories from "../functions.item.view/dataCategories.js";
import DataPrice from "../functions.item.view/dataPrice.js";
import GetImage from "../functions.item.view/getImage.js";
import DataDescription from "../functions.item.view/dataDescription.js";
import Book from "../functions.item.view/templateBook.js";
import Categories from "../functions.item.view/templateCategories.js";
import ViewCount from "../functions.item.view/templateViewCount.js";



class ItemView extends React.Component {

  state = {
    Book,
    Categories,
    ViewCount
  };

  async componentDidMount() {

    const productRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/books'
    });
    const productCategories = await axios({
      method: 'GET',
      url: 'http://localhost:1337/categories'
    });
    const increaseView = await axios({
      method: 'GET',
      url: 'http://localhost:1337/Book-Counts'
    });
    console.log("App.res ", productRes);
    const Book = productRes.data;
    const Categories = productCategories.data;
    const ViewCount = increaseView.data;
    this.setState({Book,Categories,ViewCount})
  }

  render(){
    return (
      <div className="uth-inner">
        <AddViewCount ViewCount={this.state.ViewCount}/>
        <table>
          <thead>
          <tr>
            <th>

              <div className="leftSide">
                <div className="nameDiv">

                  <DataBook Book={this.state.Book} className="bookAuthor"/>

                </div>
                <div className="mainBox">
                  <GetImage Book={this.state.Book} className="bookImage"/>
                </div>
                <div className="empty1">

                </div>
              </div>
            </th>

            <th>
              <div className="rightSide">
                <DataPrice Book={this.state.Book} className="price"/>
                <table className="table1">
                  <thead>
                  <tr>
                    <th>
                      <form>
                        <input type="number" className="number" min="1" defaultValue="1" ></input>
                      </form>
                    </th>
                    <th>
                      <button className="buttonAdd" >Add to cart</button>
                    </th>
                  </tr>
                  </thead>
                </table>
                <div className="descriptionDiv">
                  <p className="description">Categories:</p>

                  <DataCategories Categories={this.state.Categories} className="description"/>
                  <p className="description">Description:</p>
                  <DataDescription Book={this.state.Book} className="categories"/>
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
