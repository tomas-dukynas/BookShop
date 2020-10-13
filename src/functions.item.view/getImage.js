import React from 'react';

export default function GetImage(props) {
  const imageSource = props.Book[0].PhotoOfTheBook.name;
  return (
    <img src={imageSource} alt="" className="bookImage">
    </img>
  )
}