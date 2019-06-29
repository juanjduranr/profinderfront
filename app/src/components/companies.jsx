import React, { Component } from "react";
import { getCompanies } from "../services/companyService";
import { getCompanyTypes } from "../services/companyTypeService";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import ListGroup from "./common/listGroup";
import CompanyCard from "./companyCard";
import _ from "lodash";

class Companies extends Component {
  state = {
    companies: [],
    companyTypes: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
    selectedCompanyType: null
  };

  async componentDidMount() {
    const { data: companies } = await getCompanies();
    const { data: companyTypesData } = await getCompanyTypes();
    const companyTypes = [{ id: 0, name: "All" }, ...companyTypesData];

    this.setState({ companies, companyTypes });
  }

  paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
      .slice(startIndex)
      .take(pageSize)
      .value();
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({
      searchQuery: query,
      selectedCompanyType: null,
      currentPage: 1
    });
  };

  handleCompanyTypeSelect = companyType => {
    this.setState({
      selectedCompanyType: companyType,
      searchQuery: "",
      currentPage: 1
    });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedCompanyType,
      searchQuery,
      companies: allCompanies
    } = this.state;

    let filtered = allCompanies;
    if (searchQuery)
      filtered = allCompanies.filter(c =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCompanyType && selectedCompanyType.id)
      filtered = allCompanies.filter(
        m => m.serviceTypeId === selectedCompanyType.id
      );

    const companies = this.paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: companies };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, data } = this.getPagedData();

    return (
      <div>
        <div className="row">
          <div className="offset-3" />
        </div>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.companyTypes}
              selectedItem={this.state.selectedCompanyType}
              onItemSelect={this.handleCompanyTypeSelect}
            />
          </div>
          <div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <CompanyCard companies={data} />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Companies;
