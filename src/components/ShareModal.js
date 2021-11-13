import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

import BASE_URL from '../config/IpAdress';

const ShareModal = ({ book, modalIsOpenS, setModalIsOpenS }) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const onSendSubmit = () => {
    const link = `http://localhost:3000/one-book-view/${book.id}`;

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
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpenS}
        onRequestClose={() => setModalIsOpenS(false)}
        className="popupShare"
      >
        <form onSubmit={onSendSubmit}>
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
          <button type="submit" className="buttonClose">
            Send
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ShareModal;
