import React, { Component } from "react";
import { Link } from "react-router-dom";
import doodles from "../doodles.png";

class Home extends Component {
  componentWillMount() {
    document.body.style.backgroundImage = "url('" + doodles + "')";
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }

  render() {
    return (
      <div className="jumbotron">
        <h1 className="display-4">Welcome to Pro Finder!</h1>
        <p className="lead">
          Pro Finder let you search for professionals to resolve any kind of
          problem!
        </p>
        <hr className="my-4" />
        <p>Start looking right now, click on the button bellow.</p>
        <p className="lead">
          <Link to={`/companies`} className="card-title">
            <button className="btn btn-primary">Search now</button>
          </Link>
        </p>
      </div>
    );
  }
}

export default Home;
