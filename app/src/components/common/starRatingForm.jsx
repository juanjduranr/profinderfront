import React, { Component } from "react";
const starOn = "fa fa-star checked";
const starOff = "fa fa-star-o checked";
class StartRatingForm extends Component {
  state = {
    stars: [starOn, starOn, starOn, starOn, starOn]
  };

  onOver = rating => {
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
            onMouseOver={() => this.onOver(index + 1)}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default StartRatingForm;
