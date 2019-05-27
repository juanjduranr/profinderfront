import React, { Component } from "react";
import StarRating from "./starRating";

class CompanyCard extends Component {
  render() {
    const { companies } = this.props;

    return (
      <div>
        <br />
        {companies.map(company => (
          <div key={company.id}>
            <div className="row">
              <div className="col-3">
                <a href="/" className="">
                  <img
                    src="https://placeimg.com/200/200/tech"
                    alt="ok"
                    className="img-thumbnail"
                  />
                </a>
              </div>
              <div>
                <div>
                  <a href="/" className="card-title">
                    {company.name}
                  </a>
                </div>
                <StarRating />
                <div>Description: {company.description}</div>
                <span className="badge badge-primary mt-1">$$$</span>
                <div className="mt-1">
                  <span className="fa fa-clock-o mr-1" />
                  Since 1955 |
                  <span className="fa fa-handshake-o ml-1 mr-1" />
                  Hires 19 |
                  <span className="fa fa-usd ml-1 mr-1" />
                  $30 / Hour
                </div>
                <input
                  type="button"
                  className="btn btn-primary mt-1"
                  value="View profile"
                />
              </div>
            </div>
            <div>
              <hr />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default CompanyCard;
