import React, { Component } from "react";
import StarRating from "./common/starRating";

class ReviewCard extends Component {
  state = {};
  render() {
    console.log(this.props);
    return (
      <div className="mt-4">
        {this.props.reviews.map(r => (
          <div key={r.id}>
            <div className="row ml-3">
              <div className="mr-3">{r.usuario}</div>
              <StarRating />
            </div>
            <div className="row ml-3 mt-2">
              <div>{r.comentario}</div>
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
