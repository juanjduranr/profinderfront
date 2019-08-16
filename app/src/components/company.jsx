import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRating from "./common/starRating";
import { getCompany } from "../services/companyService";
import CompanyDetail from "./companyDetail";
import Reviews from "./reviews";

class Company extends Component {
  state = { company: null, isDetailActive: true, isReviewsActive: false };

  async componentDidMount() {
    try {
      const companyId = this.props.location.pathname.split("/")[2];
      const { data: company } = await getCompany(companyId);
      this.setState({ company });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
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

  onGoBackClick = () => {
    this.props.history.goBack();
  };

  render() {
    const { company } = this.state;
    //const { user } = this.props;
    if (!company) return <h1>Professionals</h1>;
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
              <img src={company.imageUrl} alt="ok" className="img-thumbnail" />
            </div>
            <div className="col-6">
              <h1>{company.name}</h1>
              <StarRating
                rating={company.rating}
                totalReviews={company.totalReviews}
              />
              <Link to={`/addreview/${company.id}`} className="card-title">
                <input
                  type="button"
                  className="btn btn-warning mt-3"
                  value="Add review"
                />
              </Link>
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
          <input
            type="button"
            value="Return to list"
            className="btn btn-outline-primary"
            onClick={this.onGoBackClick}
          />
        </div>
      );
  }
}

export default Company;
