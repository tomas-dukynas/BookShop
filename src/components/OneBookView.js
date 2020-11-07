import React, {useState} from 'react';
import '../Styles/ItemView.css';
import AddViewCount from '../functions.item.view/addViewCount';
import BookCategories from './BookCategories';
import Image from './Image';
import BookDescription from './BookDescription';
import AuthContext from '../context/AuthContext';
import Modal from 'react-modal';




const OneBookView = ({
  id,
  img,
  price,
  author,
  description,
  name,
  categories1,
  viewCount,
  setShow,
  //quantity
}) => {
  const { addToCart } = React.useContext(AuthContext);

  const addToShoppingBag = () => {        // not called, addToCard called directly to create pop up
    addToCart(id);

    //quantity=quantity+1;
    //addToCart(id, quantity);

    //console.log(id , "***************");
    //console.log(quantity);


  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (

    <div className="uth-inner">
      <div >

        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} ariaHideApp={false} className="popup">
          <h2 className="popupH2"> Added to cart</h2>
          <button onClick={()=> setModalIsOpen(false)} className="buttonClose">Close</button>
        </Modal>

      </div>
      <AddViewCount ViewCount={viewCount} id={id} />
      <button type="button" className="buttonAdd" onClick={() => setShow(false)}>
        Go back
      </button>
      <div className="bookAuthor">{author} - {name}</div>
      <table>
        <thead>
          <tr>
            <th>
              <div className="leftSide">

                {/*<div className="bookName">{name}</div>*/}
                <div className="mainBox">
                  <Image img={img} />
                </div>
                <div className="empty1" />
              </div>
            </th>
            <th>
              <div className="rightSide">
                <h4 className="price">{price}€</h4>
                <form /*onSubmit={addToShoppingBag}*/>
                <table className="table1">
                  <thead>
                    <tr>
                      <th>

                          <input type="number" className="number" min="1" defaultValue="1" />

                      </th>
                      <th>
                        <button type="button" className="buttonAdd" //onClick={addToShoppingBag   }
                                onClick={()=> {setModalIsOpen(true); addToCart(id)}}
                      //           handleClick=(e)=>{
                      //             console.log("this is working fine");
                      //             e.preventDefault();
                      //             e.target.style.color = 'black'
                      //             console.log(e.target);
                      // }
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
                  <BookCategories categories1={categories1} className="description" />
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
