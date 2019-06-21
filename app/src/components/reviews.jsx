import React, { Component } from "react";
import StarRating from "./common/starRating";

class Reviews extends Component {
  state = {
    reviews: [
      { usuario: "jjduran", comentario: "Es una excelente empresa" },
      { usuario: "jjduran", comentario: "Es una excelente empresa" },
      { usuario: "jjduran", comentario: "Es una excelente empresa" }
    ]
  };

  render() {
    if (!this.props.isActive) return <div />;
    else
      return (
        <div className="mt-4">
          {this.state.reviews.map(r => (
            <div>
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

export default Reviews;
