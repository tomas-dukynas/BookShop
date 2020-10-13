import React from 'react';

export default function GetImage(props) {
  // eslint-disable-next-line react/destructuring-assignment
  const imageSource = props.Book[0].PhotoOfTheBook.name;
  return <img src={imageSource} alt="" className="bookImage" />;
}
