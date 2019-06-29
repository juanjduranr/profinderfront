import React from "react";
const StarRating = ({ rating = 0, totalReviews = 0 }) => {
  //Numbers of stars to display
  const stars = [0, 1, 2, 3, 4];

  const setStar = position => {
    return position < rating ? "fa fa-star checked" : "fa fa-star-o checked";
  };

  const renderTotalReviews = () => {
    if (totalReviews > 0) return <span className="ml-2">({totalReviews})</span>;
  };

  if (rating === 0) return <div />;

  return (
    <div>
      {stars.map(star => (
        <span key={star} className={setStar(star)} />
      ))}
      {renderTotalReviews()}
    </div>
  );
};

export default StarRating;
