import React, { Component } from "react";
import StarRating from "./common/starRating";

class ReviewCard extends Component {
  state = {};
  render() {
    const { reviews } = this.props;
    if (reviews.length == 0)
      return (
        <div class="alert alert-info mt-4" role="alert">
          This company hasn't been reviewed yet!
        </div>
      );
    return (
      <div className="mt-4">
        {reviews.map(r => (
          <div key={r.id}>
            <div className="row ml-3">
              <div>{r.usuario}</div>
              <h3>Title</h3>
              <div className="ml-4 mt-2">
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
  }
}

export default ReviewCard;
