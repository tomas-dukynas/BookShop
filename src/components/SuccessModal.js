import React from 'react';
import Modal from 'react-modal';
import '../Styles/Checkout.css';

const SuccessModal = ({ modalIsOpen, setModalIsOpen, text, handleModalClose }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      className="popup"
    >
      <h4 className="popupH2">{text}</h4>
      <button type="button" onClick={handleModalClose} className="buttonClose">
        Close
      </button>
    </Modal>
  );
};
export default SuccessModal;
