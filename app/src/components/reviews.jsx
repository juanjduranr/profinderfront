import React, { Component } from "react";
import ReviewCard from "./reviewCard";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import reviewService from "../services/reviewService";
import authService from "../services/authService";
import { toast } from "react-toastify";
import ModalMessage from "./common/modalMessage";

class Reviews extends Component {
  state = {
    reviews: [],
    currentPage: 1,
    pageSize: 3,
    showModal: false
  };

  async componentDidMount() {
    this.setState({ reviews: this.props.company.reviews });
  }

  handleOpen = () => {
    this.setState({ showModal: true });
  };

  handleClose = () => {
    this.setState({ showModal: false });
    this.props.onLogout();
  };

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
      this.props.onChange();
    } catch (ex) {
      if (ex && ex.message === "tokenExpiredException") {
        this.handleOpen();
      }

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
          <ModalMessage
            message="Session has expired"
            showModal={this.state.showModal}
            onClose={this.handleClose}
          />
        </React.Fragment>
      );
  }
}

export default Reviews;
