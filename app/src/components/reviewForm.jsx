import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import reviewService from "../services/reviewService";
import authService from "../services/authService";
import companyService from "../services/companyService";
import { toast } from "react-toastify";
import StartRatingForm from "./common/starRatingForm";

class ReviewForm extends Form {
  state = {
    data: { comment: "" },
    companyId: 0,
    rating: 5,
    errors: {}
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

  handleGoBack = () => {
    this.props.history.goBack();
  };

  handleRatingChange = rating => {
    console.log(rating);
    this.setState({ rating });
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
            <StartRatingForm onRatingChange={this.handleRatingChange} />
          </div>
          {this.renderInput("comment", "Comment")}
          <div />
          <input
            type="button"
            value="Back"
            className="btn btn-outline-primary mr-3"
            onClick={this.handleGoBack}
          />
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ReviewForm;
