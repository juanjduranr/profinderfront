import React from "react";
const StarRating = ({ rating = 0 }) => {
  //Numbers of stars to display
  const stars = [0, 1, 2, 3, 4];

  const setStar = position => {
    return position < rating ? "fa fa-star checked" : "fa fa-star-o checked";
  };

  return (
    <div>
      {stars.map(star => (
        <span key={star} className={setStar(star)} />
      ))}
    </div>
  );
};

export default StarRating;
