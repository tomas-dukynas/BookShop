import React from 'react';
import axios from 'axios';
import BooksList from '../components/BooksList';

const AllBooks = () => {
  const [listBooks, setListBooks] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [viewCount, setViewCount] = React.useState(0);

  React.useEffect(() => {
    axios
      .get('http://localhost:1337/books')
      .then(({ data }) => {
        setListBooks(data);

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
