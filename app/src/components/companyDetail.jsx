import React, { Component } from "react";

class CompanyDetail extends Component {
  async componentDidMount() {
    console.log(this.props);
  }

  render() {
    if (!this.props.isActive) return <div />;
    else {
      const { company } = this.props;
      return (
        <React.Fragment>
          <br />
          <div className="row col-9">
            <p>
              <b>Description:</b> {company.description}
            </p>
          </div>
          <br />
          <div className="row">
            <div className="col-3">
              <p>
                <b>Overview</b>
              </p>
              <p>{company.numberOfEmployees} employees</p>
              <p>11 years in business</p>
            </div>
            <div className="col-4">
              <p>
                <b>Bussiness hours</b>
              </p>
              <p>7:00 - 18:00</p>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default CompanyDetail;
