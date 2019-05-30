import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavDetail extends Component {
  state = {};
  render() {
    return (
      <div>
        <Link to={`/companies/`}>
          <span className="mr-5 font-weight-light">About</span>
        </Link>
        <Link to={`/companies/`}>
          <span className="font-weight-light">Reviews</span>
        </Link>
        <hr />
      </div>
    );
  }
}

export default NavDetail;
