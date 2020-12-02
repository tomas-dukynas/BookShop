import React from 'react';
import axios from 'axios';
import BASE_URL from '../config/IpAdress';

import Modal from 'react-modal';

const ShareModal = ({ book, modalIsOpenS, setModalIsOpenS, handleModalClose }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const Share = () => {
    const link = 'http://localhost:3000/list-view';

    axios.post(`${BASE_URL}/email`, {
      to: email,
      from: 'tomas.dukynas@gmail.com',
      replyTo: 'tomas.dukynas@gmail.com',
      subject: 'Book recommendation',
      text: `Hello, ${name || 'Customer'} Your friend recommended you a book! It is called: ${
        book.NameOfTheBook
      } , by is: ${book.Author} .
        \n Press the link and check it out: ${link} `,
    });
    setModalIsOpenS(false);
    console.log('AAAA');
    //modalIsOpenS=true;
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpenS}
        onRequestClose={() => setModalIsOpenS(false)}
        /*ariaHideApp={false}*/
        className="popupShare"
      >
        <form onSubmit={Share}>
          <h5 className="popupH4">Enter your friend name</h5>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            className="input"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <h5 className="popupH2">Enter your friend email</h5>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            className="input"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <button type="submit" /*onClick={handleModalClose}*/ className="buttonClose">
            Send
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ShareModal;
