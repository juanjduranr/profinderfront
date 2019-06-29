import React, { Component } from "react";
import StarRating from "./common/starRating";
import { getCompany } from "../services/companyService";
import CompanyDetail from "./companyDetail";
import Reviews from "./reviews";

class Company extends Component {
  state = { company: null, isDetailActive: true, isReviewsActive: false };

  async componentDidMount() {
    const currentId = this.props.location.pathname.split("/")[2];
    const response = await getCompany(currentId);
    this.setState({ company: response.data });
  }

  changeView = () => {
    const isDetailActive = !this.state.isDetailActive;
    const isReviewsActive = !this.state.isReviewsActive;
    this.setState({
      isDetailActive,
      isReviewsActive
    });
  };

  onAboutClick = () => {
    if (!this.state.isDetailActive) this.changeView();
  };
  onReviewsClick = () => {
    if (!this.state.isReviewsActive) this.changeView();
  };

  render() {
    const { company } = this.state;
    console.log("oh si", company);
    if (!company) return <h1>Vacio</h1>;
    else
      return (
        <div className="offset-1 col-10">
          <div>
            <button
              type="button"
              className="btn btn-link mr-5"
              onClick={this.onAboutClick}
            >
              About
            </button>
            <button
              type="button"
              className="btn btn-link mr-5"
              onClick={this.onReviewsClick}
            >
              Reviews
            </button>
            <hr />
          </div>
          <div className="row">
            <div className="col-3">
              <img
                src="https://placeimg.com/200/200/tech"
                alt="ok"
                className="img-thumbnail"
              />
            </div>
            <div className="col-6">
              <h1>{company.name}</h1>
              <StarRating
                rating={company.rating}
                totalReviews={company.reviewsCount}
              />
            </div>
          </div>
          <CompanyDetail
            company={this.state.company}
            isActive={this.state.isDetailActive}
          />
          <Reviews
            isActive={this.state.isReviewsActive}
            company={this.state.company}
          />
        </div>
      );
  }
}

export default Company;
