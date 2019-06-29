import React, { Component } from "react";

class CompanyDetail extends Component {
  state = {};

  async componentDidMount() {
    //console.log(this.props);
  }

  render() {
    if (!this.props.isActive) return <div />;
    else
      return (
        <React.Fragment>
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
              <p>7:00 - 18:00</p>
            </div>
          </div>
        </React.Fragment>
      );
  }
}

export default CompanyDetail;
