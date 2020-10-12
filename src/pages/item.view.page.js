import React from 'react';
import AuthContext from '../context/AuthContext';
import CheckEmail from '../components/CheckEmail';
import '../Styles/ItemView.css';
import Login from './login.page';
import Register from './register.page';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config/IpAdress';


const Book = [
{id: 1, Author: "Antanas", NameOfTheBook: "THE NAME OF THE BOOK", Price: 6, PhotoOfTheBook: "https://gamepedia.cursecdn.com/fallout_gamepedia/d/d2/Pre-War_Book_03.png", Description: "A book"}
];
const Catego = [
  {NameOfTheCategory: "Name"},
  {NameOfTheCategory: "2nd Name"}
];
const ViewCount = [
  {id: 1, IdOfBook: 1, Counter: 3}
];

function AddViewCount(props) {
  const increaseView = props.ViewCount[0].Counter;

  console.log("productname ", increaseView);
  //const item = increaseView +1;
  const item = {
    id: props.ViewCount[0].id,
    IdOfBook: props.ViewCount[0].IdOfBook,
    Counter: increaseView +1
  };

  const add = axios.post('http://localhost:1337/Book-Counts', {item});
  console.log("productname ", item);

  return (
    <p></p>
  )
}
function ExampleCat(props) {
  const productCatego = props.Catego[0].NameOfTheCategory;
  const productCatego1 = props.Catego[1].NameOfTheCategory;

  return (
    <p className="categories">{productCatego}, {productCatego1}</p>
  )
}

function ExampleData(props) {
  //console.log("props", props);
  const productBook = props.Book[0].NameOfTheBook;
  const productAuthor = props.Book[0].Author;
  //console.log("productname ", productBook);
  return (
    <h3 className="bookAuthor">{productAuthor} - {productBook}</h3>
      )
}

function ExamplePrice(props) {
  const productPrice = props.Book[0].Price;
  return (
    <p className="price"> {productPrice} € </p>
  )
}
function GetImage(props) {
  const imageSource = props.Book[0].PhotoOfTheBook.name;
  return (
    <img src={imageSource} alt="" className="bookImage">
    </img>
  )
}
function ExampleDescription(props) {
  const productDescription = props.Book[0].Description;
  return (
    <p className="categories">{productDescription}</p>
  )
}

function addViewCount(vie) {
  // get data from strapi
  // data++
  //send data back to strapi
}

class ItemView extends React.Component {

  state = {
    Book,
    Catego,
    ViewCount
  };

  async componentDidMount() {

    const productRes = await axios({
      method: 'GET',
      url: 'http://localhost:1337/books'
    });
    const productCatego = await axios({
      method: 'GET',
      url: 'http://localhost:1337/categories'
    });
    const increaseView = await axios({
      method: 'GET',
      url: 'http://localhost:1337/Book-Counts'
    });
    console.log("App.res ", productRes);
    const Book = productRes.data;
    const Catego = productCatego.data;
    const ViewCount = increaseView.data;
    this.setState({Book,Catego,ViewCount})
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

                  {/*<h3 className="bookAuthor"> Antanas Škėma - Balta drobulė{ExampleData}</h3>*/}
                  <ExampleData Book={this.state.Book} className="bookAuthor"/>


                </div>
                <div className="mainBox">
                  <GetImage Book={this.state.Book} className="bookImage"/>
                  {/*<img src="http://katekizmas.group.lt/text/lietuviai/skema/foto_balta_drobule.jpg" alt="" className="bookImage">*/}
                  {/*</img>*/}
                </div>
                <div className="empty1">

                </div>
              </div>
            </th>


            <th>
              <div className="rightSide">
                {/*<p className="price"> 15 € </p>*/}
                <ExamplePrice Book={this.state.Book} className="price"/>
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
                  {/*<p className="categories">XX a. literatūra, Katastrofinis modernizmas</p>*/}
                  <ExampleCat Catego={this.state.Catego} className="description"/>
                  <p className="description">Description:</p>
                  {/*<p className="categories">A.Škėma – modernus vakarietiškas rašytojas. Jo intelektualinis-psichologinis romanas “Balta drobulė” parašytas “sąmonės srauto” forma, su gausiomis iliuzijomis į pasaulinę ir lietuvių kultūrą, filosofiją, literatūrą, istoriją, mitologiją. A.Škėmos romano herojus Antanas Garšva praeina sudėtingą kančių, dvasinių sukrėtimų kelią. Tai tikras XXa. žmogus. Jis – intelektualas Emigranto padėtis neatitinka A. Garšvos dvasinio turinio ir interesų. IŠ to kyla ironiškas santykis su pasauliu ir savimi. Antano Garšvos samprotavimuose iškyla absurdiško, bjauraus pasaulio vaizdas. GarŠva – menininkas, savo gyvenimo kūrėjas. Jis daug kenčia, veržiasi iŠ vieniŠumo, trokŠta dieviŠkumo Šviesos, dvasinės atramos ir amžinybės. IŠ veikėjo gyvenimo supratimo, patirties, iŠ suvokto pasaulio vaizdo, iŠ kančių ir minčių bei iŠgyvenimų kyla ir romano problemos. GarŠva sprendžia amžinus būties klausimus, kokia gyvenimo prasmė, jei jos nėra – kam gyventi.</p>*/}
                  <ExampleDescription Book={this.state.Book} className="categories"/>
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
/*
const View = () => {

  return (
    <div>
      <table>
          <tr>
            <th>

      <div className="leftSide">
      <div className="nameDiv">

        <h3 className="bookAuthor"> Antanas Škėma - Balta drobulė</h3>


      </div>
      <div className="mainBox">

        <img src="http://katekizmas.group.lt/text/lietuviai/skema/foto_balta_drobule.jpg" alt="" className="bookImage">
        </img>
      </div>
      <div className="empty1">

      </div>
      </div>
            </th>


          <th>
            <div className="rightSide">
              <p className="price"> 15 € </p>
              <table className="table1">
                <tr>
                  <th>
                    <form>
                      <input type="number" className="number" min="1" value="1" ></input>
                    </form>
                  </th>
                  <th>
                    <button className="buttonAdd" >Add to cart</button>
                  </th>
                </tr>

              </table>
              <div className="descriptionDiv">
                <p className="description">Categories:</p>
                <p className="categories">XX a. literatūra, Katastrofinis modernizmas</p>

                <p className="description">Description:</p>
                <p className="categories">A.Škėma – modernus vakarietiškas rašytojas. Jo intelektualinis-psichologinis romanas “Balta drobulė” parašytas “sąmonės srauto” forma, su gausiomis iliuzijomis į pasaulinę ir lietuvių kultūrą, filosofiją, literatūrą, istoriją, mitologiją. A.Škėmos romano herojus Antanas Garšva praeina sudėtingą kančių, dvasinių sukrėtimų kelią. Tai tikras XXa. žmogus. Jis – intelektualas Emigranto padėtis neatitinka A. Garšvos dvasinio turinio ir interesų. IŠ to kyla ironiškas santykis su pasauliu ir savimi. Antano Garšvos samprotavimuose iškyla absurdiško, bjauraus pasaulio vaizdas. GarŠva – menininkas, savo gyvenimo kūrėjas. Jis daug kenčia, veržiasi iŠ vieniŠumo, trokŠta dieviŠkumo Šviesos, dvasinės atramos ir amžinybės. IŠ veikėjo gyvenimo supratimo, patirties, iŠ suvokto pasaulio vaizdo, iŠ kančių ir minčių bei iŠgyvenimų kyla ir romano problemos. GarŠva sprendžia amžinus būties klausimus, kokia gyvenimo prasmė, jei jos nėra – kam gyventi.</p>
              </div>
            </div>
          </th>
        </tr>
      </table>
</div>

  );
};*/
export default ItemView;
