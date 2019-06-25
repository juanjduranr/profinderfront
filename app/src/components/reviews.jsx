import React, { Component } from "react";
import ReviewCard from "./reviewCard";
import Pagination from "./common/pagination";
import _ from "lodash";

class Reviews extends Component {
  state = {
    reviews: [
      { id: 1, usuario: "jduran", comentario: "Es una excelente empresa" },
      { id: 2, usuario: "prodriguez", comentario: "Es una excelente empresa" },
      { id: 3, usuario: "kfatima", comentario: "Es una excelente empresa" },
      { id: 4, usuario: "ngutierrez", comentario: "Es una excelente empresa" },
      { id: 5, usuario: "hnunez", comentario: "Es una excelente empresa" },
      { id: 6, usuario: "mvergara", comentario: "Es una excelente empresa" },
      { id: 7, usuario: "zrodriguez", comentario: "Es una excelente empresa" },
      { id: 8, usuario: "kspeaker", comentario: "Es una excelente empresa" },
      { id: 9, usuario: "zkentenply", comentario: "Es una excelente empresa" }
    ],
    currentPage: 1,
    pageSize: 5
  };

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
