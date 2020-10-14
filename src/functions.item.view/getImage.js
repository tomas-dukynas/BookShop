import React from 'react';

export default function GetImage({ Book }) {
  const imageSource = Book[0]?.PhotoOfTheBook.name;
  return <img src={imageSource} alt="" className="bookImage" />;
}
