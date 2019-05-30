import React, { Component } from "react";
import StarRating from "./common/starRating";
import NavDetail from "./common/navDetail";
import { getCompany } from "../services/companyService";

class CompanyDetail extends Component {
  state = { company: null };

  async componentDidMount() {
    const currentId = this.props.location.pathname.split("/")[2];
    const response = await getCompany(currentId);
    this.setState({ company: response.data });
  }

  render() {
    const { company } = this.state;
    if (!company) return <h1>Vacio</h1>;
    else
      return (
        <div className="offset-1 col-10">
          <NavDetail />
          <div className="row">
            <div className="col-3">
              <img
                src="https://placeimg.com/200/200/tech"
                alt="ok"
                className="img-thumbnail"
              />
            </div>
            <div className="col-6">
              <h1>{this.state.company.name}</h1>
              <StarRating />
            </div>
          </div>
          <br />
          <div className="row col-9">
            <p>
              <b>Description:</b> Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but
              also the leap into electronic typesetting, remaining essentially
              unchanged. It was popularised in the 1960s with the release of
              Letraset sheets containing Lorem Ipsum passages, and more recently
              with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
          <br />
          <div className="row">
            <div className="col-3">
              <p>
                <b>Overview</b>
              </p>
              <p>Hired 16 times</p>
              <p>3 employees</p>
              <p>11 years in business</p>
            </div>
            <div className="col-4">
              <p>
                <b>Bussiness hours</b>
              </p>
              <p>Qq</p>
            </div>
          </div>
        </div>
      );
  }
}

export default CompanyDetail;
