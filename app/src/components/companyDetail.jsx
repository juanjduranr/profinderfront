import React from "react";

const CompanyDetail = ({ company, isActive }) => {
  const getYearsInBusiness = foundedDate => {
    var diffDate = Date.now() - new Date(foundedDate).getTime();
    var yearsDate = new Date(diffDate);
    return Math.abs(yearsDate.getUTCFullYear() - 1970);
  };

  const renderYearsInBusiness = foundedDate => {
    const yearsInBusiness = getYearsInBusiness(foundedDate);
    if (yearsInBusiness > 0) return <p>{yearsInBusiness} years in business</p>;
  };

  if (!isActive) return <div />;
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
          {renderYearsInBusiness(company.foundedDate)}
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
};

export default CompanyDetail;
