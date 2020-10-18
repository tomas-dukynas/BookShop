import axios from 'axios';

export default function AddViewCount({ ViewCount }) {
  const increaseView = ViewCount[0]?.Counter;
  if (increaseView > 0) {
    const add = axios.put('http://localhost:1337/Book-Counts/1', {
      /* id: 1,
      IdOfBook: '1', */
      Counter: increaseView + 1,
    });
  }
  return null;
}
