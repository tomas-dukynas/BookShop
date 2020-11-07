import React from 'react';
import axios from 'axios';
import BooksList from '../components/BooksList';

const AllBooks = () => {
  const [listBooks, setListBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [viewCount, setViewCount] = React.useState(0);
  // const [number, setNumber] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('http://localhost:1337/books')
      .then(({ data }) => {
        setListBooks(data);
        // console.log(data[0].id);
        /* const test1 = data.map((book) => {

          const tes ={id: book.id, number : 0};

          return (
            //book.id = book.id,
            //book.quantity = 0

            tes

          )}); */
        // setNumber(test1);
        // console.log(test1);
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/categories')
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((e) => console.log(e));
    axios
      .get('http://localhost:1337/Book-Counts')
      .then(({ data }) => {
        setViewCount(data);
        // console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <BooksList books={listBooks} categories={categories} viewCount={viewCount} />
    </div>
  );
};

export default AllBooks;
