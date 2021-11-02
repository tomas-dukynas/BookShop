import React from 'react';

const ps3 = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    const results = listBooks?.filter(
      (person) =>
        person.Author.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.NameOfTheBook.toString().toLocaleLowerCase().includes(searchTerm.toLowerCase()),
    );

    setSearchResults(results);
  }, [searchTerm]);

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
    // console.log(authorsArray, 'AUTHORS ARRAY');
  }, [searchResults, searchTerm, categoriesArray, authorsArray]);

  // console.log(categoriesArray, 'CATEG ARRAY');

  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = React.useState(0);
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleOnPress = (book) => {
    console.log(book.id);
    history.push('/one-book-view/' + book.id);

    if (book.PhotoOfTheBook?.name) {
      setImg(book.PhotoOfTheBook.name);
    } else {
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
    array.length === 0 &&
    bookList.length === 0 &&
    bookList !== listBooks
  ) {
    setBookList(listBooks);
  }
};
