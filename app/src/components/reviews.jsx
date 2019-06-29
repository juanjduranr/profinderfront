import React, { Component } from "react";
import ReviewCard from "./reviewCard";
import Pagination from "./common/pagination";
import { getReviewsByCompany } from "../services/reviewService";
import _ from "lodash";

class Reviews extends Component {
  state = {
    reviews: [],
    currentPage: 1,
    pageSize: 2
  };

  async componentDidMount() {
    const { company } = this.props;
    const response = await getReviewsByCompany(company.id);
    this.setState({ reviews: response.data });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const { reviews: allreviews, pageSize, currentPage } = this.state;
    const data = this.paginate(allreviews, currentPage, pageSize);
    return { data, totalCount: allreviews.length };
  };

  paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
      .slice(startIndex)
      .take(pageSize)
      .value();
  }

  render() {
    const { data, totalCount } = this.getPageData();
    const { pageSize, currentPage } = this.state;

    if (!this.props.isActive) return <div />;
    else
      return (
        <React.Fragment>
          <ReviewCard reviews={data} />
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
