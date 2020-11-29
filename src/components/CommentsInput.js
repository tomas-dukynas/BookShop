import React from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import BASE_URL from '../config/IpAdress';
import SuccessModal from './SuccessModal';
import AuthContext from '../context/AuthContext';

const CommentsInput = ({ bookId }) => {
  const state = React.useContext(UserContext);
  const { addComment } = React.useContext(AuthContext);
  const [comment, setComment] = React.useState('');
  const [comModalIsOpen, setComModalIsOpen] = React.useState(false);
  const [cantModalIsOpen, setCantModalIsOpen] = React.useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${BASE_URL}/comments/`,
      {
        comment,
        name: state.user.email,
        book: bookId,
      },
      {
        headers: {
          Authorization: `Bearer ${state.user?.token}`,
        },
      },
    );
    if (response.status === 200) {
      await axios.get(`${BASE_URL}/comments/`).then(({ data }) => {
        console.log(data);
      });
      const newComments = state.comments;
      newComments.push(comment);
      addComment(newComments);
      setComModalIsOpen(true);
    } else {
      setCantModalIsOpen(true);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <SuccessModal
        modalIsOpen={comModalIsOpen}
        setModalIsOpen={setComModalIsOpen}
        text="You wrote the comment"
        handleModalClose={() => setComModalIsOpen(false)}
      />
      <SuccessModal
        modalIsOpen={cantModalIsOpen}
        setModalIsOpen={setComModalIsOpen}
        text="You can't write more comments on this book"
        handleModalClose={() => setCantModalIsOpen(false)}
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="comment">Leave your comment:</label>
      <br />
      <input
        type="text"
        id="comment"
        name="comment"
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentsInput;
