import React, { Component } from "react";
import LegislationSortFilter from "./LegislationSortFilter";
import Legislation from "./Legislation";
import Pages from "../Pages";

import "./css/Legislations.css";

class Legislations extends Component {

  getStatus = enacted => {
    if (enacted != null) {
      return "Enacted";
    }
    return "Pending";
  };

  getEnacted = enacted => {
    if (enacted != null) {
      return enacted;
    }
    return "N/A";
  };

  getBillType = billType => {
    if (billType === "hr" || billType === "hres") {
      return "House of Representatives";
    }
    return "Senate";
  };

  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democratic";
    }
    return sponsor_party;
  };

  state = {
    collapse: true,
    legislations: [],
    metaData: {
      currentPage: 1,
      lastPage: 1
    },
    sorted: "",
    loading: true
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearch = _ => {
    const search = this.state.search.toLowerCase();
    window.location = `/Legislations/search?attribute=${search}`;
  };

  componentDidMount() {
    const querystring = this.props.location.search;
    const pathname = this.props.location.pathname;
    const url = `https://api.foodmeonce.me${pathname}${querystring}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let legislations = data["data"];
        let metaData = data["metaData"];
        let sorted = data["sorted"];
        this.setState({ legislations, metaData, sorted, loading: false });
      })
      .catch(console.log);
  }
  render() {
    const pathname = this.props.location.pathname;
    const querystring = this.props.location.search;
    let search = null;
    if (pathname === "/Legislations/search" && querystring != null) {
      const parsedQuerystring = querystring.substring(1).split("&");
      for (let i = 0; i < parsedQuerystring.length; ++i) {
        if (parsedQuerystring[i].includes("attribute")) {
          const index = parsedQuerystring[i].indexOf("=");
          search = parsedQuerystring[i].substring(index + 1);
          break;
        }
      }
    }
    const legislationsRendered = this.state.legislations.map(
      (legislation, i) => {
        return (
          <a
            key={i}
            href={`/Legislations/Instance/${legislation.id}`}
            className="button-container"
          >
            <Legislation
              name={legislation.short_title}
              year={legislation.introduced_date}
              status={this.getStatus(legislation.enacted)}
              enacted_Year={this.getEnacted(legislation.enacted)}
              houseOfRepresentative={this.getParty(legislation.sponsor_party)}
              billType={this.getBillType(legislation.bill_type)}
              sponsors={legislation.sponsor_name}
              search={search}
            />
          </a>
        );
      }
    );
    const renderPage = this.state.loading ? (
      <h2 className="text-center m-3">Loading...</h2>
    ) : this.state.legislations.length > 0 ? (
      <React.Fragment>
        <div className="legislations-container d-flex flex-column bd-highlight mb-3">
          <Legislation header />
          {legislationsRendered}
        </div>
        <Pages
          url={this.props.location.pathname}
          querystring={this.props.location.search}
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </React.Fragment>
    ) : (
      <h2 className="text-center m-3">No filtered/searched data...</h2>
    );
    return (
      <div className="legislations-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Legislations</h3>
            <input
              className="form-control"
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleSearch();
                }
              }}
              placeholder="Search"
              style={{ marginLeft: "15%" }}
              aria-label="Search"
            />
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && (
            <LegislationSortFilter sorted={this.state.sorted} />
          )}
        </div>
        {renderPage}
      </div>
    );
  }
}

export default Legislations;
