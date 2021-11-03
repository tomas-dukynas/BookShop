import React from 'react';

const ps3 = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // setting search results when user is typing
  React.useEffect(() => {
    const results = listBooks?.filter(
      (book) =>
        book.Author.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.NameOfTheBook.toString().toLocaleLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results);
  }, [searchTerm]);

  // setting book list
  React.useEffect(() => {
    if (
      searchTerm.length !== 0 &&
      listBooks !== bookList &&
      searchResults !== bookList &&
      searchResults.length === 0
    ) {
      setBookList(searchResults);
    } else if (searchResults.length !== 0 && searchResults !== bookList) {
      setBookList(searchResults);
    } else if (
      searchTerm.length === 0 &&
      categoriesArray.length === 0 &&
      bookList !== listBooks &&
      authorsArray.length === 0
    ) {
      setBookList(listBooks);
    }
  }, [searchResults, searchTerm, categoriesArray, authorsArray]);

  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = React.useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const onBookPress = (book) => {
    history.push('/one-book-view/' + book.id);

    if (book.PhotoOfTheBook?.name) {
      setImg(book.PhotoOfTheBook.name);
    } else {
      // setting default img if book has no image
      setImg('https://www.liweddings.com/themes/default/assets/images/no-image.png');
    }
    setShow(true);
    setBook(book);
    const comments = [];
    book.comments.forEach((item) => {
      comments.push(item.comment);
    });
    addComment(comments);
  };
};
