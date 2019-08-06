import React from "react";
import StarRating from "./common/starRating";

const ReviewCard = ({ reviews }) => {
  if (reviews.length === 0)
    return (
      <div className="alert alert-info mt-4" role="alert">
        This company hasn't been reviewed yet!
      </div>
    );

  return (
    <div className="mt-4">
      {reviews.map(r => (
        <div key={r.id}>
          <div className="row ml-3">
            <h4>{r.customerName}</h4>
            <div className="ml-4 mt-1">
              <StarRating rating={r.rating} />
            </div>
          </div>
          <div className="row ml-3 mt-2">
            <div>{r.comment}</div>
          </div>
          <div>
            <hr />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewCard;
