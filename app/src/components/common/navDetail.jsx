import React from "react";
import { Link } from "react-router-dom";

const NavDetail = () => {
  return (
    <div>
      <Link to={`/companies/`}>
        <span className="mr-5 font-weight-light">About 999</span>
      </Link>
      <Link to={`/companies/`}>
        <span className="font-weight-light">Reviews</span>
      </Link>
      <hr />
    </div>
  );
};

export default NavDetail;
