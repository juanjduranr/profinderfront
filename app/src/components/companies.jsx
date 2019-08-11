import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import { getCompanies } from "../services/companyService";
import { getCompanyTypes } from "../services/companyTypeService";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import ListGroup from "./common/listGroup";
import CompaniesDetail from "./companiesDetail";

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
        m => m.companyTypeId === selectedCompanyType.id
      );

    const companies = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, companies };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { totalCount, companies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.companyTypes}
            selectedItem={this.state.selectedCompanyType}
            onItemSelect={this.handleCompanyTypeSelect}
          />
        </div>
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <CompaniesDetail companies={companies} totalCount={totalCount} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Companies;
