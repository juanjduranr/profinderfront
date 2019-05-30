import React, { Component } from "react";
import { Link } from "react-router-dom";
import StarRating from "./common/starRating";

class CompanyCard extends Component {
  renderTitle(company) {
    return (
      <div>
        <Link to={`/companies/${company.id}`} className="card-title">
          {company.name}
        </Link>
      </div>
    );
  }

  renderImage(company) {
    return (
      <div className="col-3">
        <Link to={`/companies/${company.id}`} className="card-title">
          <img
            src="https://placeimg.com/200/200/tech"
            alt="ok"
            className="img-thumbnail"
          />
        </Link>
      </div>
    );
  }

  renderBody(company) {
    return (
      <React.Fragment>
        <div>Description: {company.description}</div>
        <span className="badge badge-primary mt-1">$$$</span>
        <div className="mt-1">
          <span className="fa fa-clock-o mr-1" />
          Since 1955
        </div>
        <Link to={`/companies/${company.id}`} className="card-title">
          <input
            type="button"
            className="btn btn-primary mt-1"
            value="View profile"
          />
        </Link>
      </React.Fragment>
    );
  }

  render() {
    const { companies } = this.props;

    return (
      <div>
        <br />
        {companies.map(company => (
          <div key={company.id}>
            <div className="row">
              {this.renderImage(company)}
              <div>
                {this.renderTitle(company)}
                <StarRating />
                {this.renderBody(company)}
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    );
  }
}

export default CompanyCard;
