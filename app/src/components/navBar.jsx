import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand" href="/">
        Pro Finder
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="companies">
            Professionals
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
