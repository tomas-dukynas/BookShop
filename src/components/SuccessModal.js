import React from 'react';
import Modal from 'react-modal';

const SuccesModal = ({ modalIsOpen, setModalIsOpen, text }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      className="popup"
    >
      <h2 className="popupH2">{text}</h2>
      <button type="button" onClick={() => setModalIsOpen(false)} className="buttonClose">
        Close
      </button>
    </Modal>
  );
};
export default SuccesModal;
