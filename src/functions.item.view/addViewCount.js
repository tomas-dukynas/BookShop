import axios from 'axios';

export default function AddViewCount({ ViewCount, id }) {
  const increaseView = ViewCount[id]?.Counter;

  if (increaseView > 0) {
    const add = axios.put('http://localhost:1337/Book-Counts/'+id, {
      /* id: 1,
      IdOfBook: '1', */
      Counter: increaseView + 1,
    });
  }
  return null;
}
