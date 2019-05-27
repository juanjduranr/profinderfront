import React, { Component } from "react";
import { getCompanies } from "../services/companyService";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import ListGroup from "./listGroup";
import CompanyCard from "./companyCard";
import _ from "lodash";

class Companies extends Component {
  state = {
    companies: [],
    currentPage: 1,
    pageSize: 3,
    searchQuery: "",
    selectedType: null
  };

  async componentDidMount() {
    const { data: companies } = await getCompanies();
    this.setState({ companies });
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
    this.setState({ searchQuery: query, selectedType: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedType,
      searchQuery,
      companies: allCompanies
    } = this.state;

    let filtered = allCompanies;
    if (searchQuery)
      filtered = allCompanies.filter(c =>
        c.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedType && selectedType.id)
      filtered = allCompanies.filter(m => m.serviceType.id === selectedType.id);

    const companies = this.paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: companies };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data } = this.getPagedData();
    console.log(data);
    return (
      <div>
        <div className="row">
          <div className="offset-3" />
        </div>
        <div className="row">
          <div className="col-3">
            <ListGroup />
          </div>
          <div>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
            <CompanyCard companies={data} test="hola" />
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
