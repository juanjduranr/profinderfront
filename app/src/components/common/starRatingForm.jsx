import React, { Component } from "react";
const starOn = "fa fa-star fa-2x checked";
const starOff = "fa fa-star-o fa-2x checked";
class StartRatingForm extends Component {
  state = {
    stars: [starOn, starOn, starOn, starOn, starOn]
  };

  handleOnOver = rating => {
    const stars = [...this.state.stars];
    for (let i = 1; i < stars.length; i++) {
      stars[i] = rating <= i ? starOff : starOn;
    }

    this.setState({ stars });
    this.props.onRatingChange(rating);
  };

  render() {
    return (
      <React.Fragment>
        {this.state.stars.map((star, index) => (
          <span
            key={index}
            className={star}
            onMouseOver={() => this.handleOnOver(index + 1)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default StartRatingForm;
