import React, { Component } from "react";
import ReviewCard from "./reviewCard";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import reviewService from "../services/reviewService";
import authService from "../services/authService";
import { toast } from "react-toastify";

class Reviews extends Component {
  state = {
    reviews: [],
    currentPage: 1,
    pageSize: 3
  };

  async componentDidMount() {
    const { company } = this.props;
    const response = await reviewService.getReviewsByCompany(company.id);
    this.setState({ reviews: response.data });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleDelete = async review => {
    const originalReviews = this.state.reviews;
    const reviews = originalReviews.filter(r => r.id !== review.id);
    this.setState({ reviews });

    try {
      const config = authService.getAuthHeader();
      await reviewService.deleteReview(review.id, config);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This review has already been deleted.");

      this.setState({ reviews: originalReviews });
    }
  };

  getPageData = () => {
    const { reviews: allreviews, pageSize, currentPage } = this.state;
    const data = paginate(allreviews, currentPage, pageSize);
    return { data, totalCount: allreviews.length };
  };

  render() {
    const { data, totalCount } = this.getPageData();
    const { pageSize, currentPage } = this.state;
    const user = authService.getCurrentUser();

    if (!this.props.isActive) return <div />;
    else
      return (
        <React.Fragment>
          <ReviewCard reviews={data} onDelete={this.handleDelete} user={user} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </React.Fragment>
      );
  }
}

export default Reviews;
