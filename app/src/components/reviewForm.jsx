import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import reviewService from "../services/reviewService";
import authService from "../services/authService";
import companyService from "../services/companyService";
import { toast } from "react-toastify";

class ReviewForm extends Form {
  state = {
    data: { comment: "" },
    companyId: 0,
    rating: 1,
    errors: {},
    stars: {
      one: "fa fa-star-o checked",
      two: "fa fa-star-o checked",
      three: "fa fa-star-o checked",
      four: "fa fa-star-o checked",
      five: "fa fa-star-o checked"
    }
  };

  schema = {
    comment: Joi.string()
      .required()
      .label("Comment")
  };

  async componentDidMount() {
    try {
      const companyId = this.props.location.pathname.split("/")[2];
      const { data } = await companyService.getCompany(companyId);
      this.setState({ companyId: data.id });
      this.onOver(5);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  onOver = rating => {
    const on = "fa fa-star checked";
    const off = "fa fa-star-o checked";
    const starsNumbers = ["one", "two", "three", "four", "five"];
    const stars = { ...this.state.stars };
    for (let i = 0; i < starsNumbers.length; i++) {
      if (rating <= i) {
        stars[starsNumbers[i]] = off;
      } else {
        stars[starsNumbers[i]] = on;
      }
    }

    this.setState({ stars, rating });
  };

  doSubmit = async () => {
    try {
      const { id: currentUserId } = authService.getCurrentUser();
      const review = {
        rating: this.state.rating,
        comment: this.state.data.comment,
        companyId: this.state.companyId,
        customerId: currentUserId
      };
      await reviewService.addReview(review, authService.getAuthHeader());
      toast.success("Review successfully added.");
      this.props.history.push("/companies/" + this.state.companyId);
    } catch (ex) {
      if (ex && ex.message === "tokenExpiredException") {
        alert("Session has expired.");
        this.props.history.push("/logout");
      }
      if (ex.response && ex.response.status === 400) {
        toast.error("An error has ocurred.");
      }
    }
  };

  render() {
    return (
      <div className="col-5">
        <h1>Add review</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <div>
              <label>Rating</label>
            </div>
            <span
              className={this.state.stars.one}
              onMouseOver={() => this.onOver(1)}
            />
            <span
              className={this.state.stars.two}
              onMouseOver={() => this.onOver(2)}
            />
            <span
              className={this.state.stars.three}
              onMouseOver={() => this.onOver(3)}
            />
            <span
              className={this.state.stars.four}
              onMouseOver={() => this.onOver(4)}
            />
            <span
              className={this.state.stars.five}
              onMouseOver={() => this.onOver(5)}
            />
          </div>
          {this.renderInput("comment", "Comment")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReviewForm;
