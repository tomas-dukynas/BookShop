import React from 'react';
import Modal from 'react-modal';

const SuccessModal = ({ modalIsOpen, setModalIsOpen, text, handleModalClose }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      ariaHideApp={false}
      className="popup"
    >
      <h2 className="popupH2">{text}</h2>
      <button type="button" onClick={handleModalClose} className="buttonClose">
        Close
      </button>
    </Modal>
  );
};
export default SuccessModal;
