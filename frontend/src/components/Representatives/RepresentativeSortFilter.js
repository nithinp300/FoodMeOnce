import React, { Component } from "react";
import State from "../Districts/State";

class representativeSortFilter extends Component {
  state = {
    sort: {},
    sortModified: false,
    filter: {}
  };

  handleSort = e => {
    let newSort = {};
    newSort.name = e.target.name;
    this.setState({ sort: newSort, sortModified: true });
  };

  handleFilter = e => {
    const field = e.target.name;
    let filter = this.state.filter;
    filter[field] = e.target.value;
    this.setState({ filter });
  };

  handleSortSubmit = e => {
    e.preventDefault();
    const attribute = this.state.sort.name;
    const name = attribute.split("-")[0];
    const order = attribute.split("-")[1];
    const url = `/Representatives/sort?attribute=${name}&order=${order}`;
    window.location = url;
  };

  handleFilter = e => {
    let field = e.target.name;
    let filter = this.state.filter;
    let value = e.target.value;
    filter[field] = value;
    this.setState({ filter });
  };

  handleFilterSubmit = e => {
    e.preventDefault();
    let url = "/Representatives/filter?";
    let firstAttribute = true;
    const date_of_birth = this.getFilteringAttributes("ageMin", "ageMax");
    const seniority = this.getFilteringAttributes(
      "yearsInOfficeMin",
      "yearsInOfficeMax"
    );
    const party = this.state.filter.party;
    const state = this.state.filter.state;

    if (date_of_birth) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "date_of_birth=" + date_of_birth;
    }
    if (seniority) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "seniority=" + seniority;
    }
    if (party) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "party=" + party;
    }
    if (state) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "state=" + state;
    }
    window.location = url;
  };

  getFilteringAttributes = (fieldMin, fieldMax) => {
    const min = "0";
    const max = "2147483647";
    const filter = this.state.filter;
    let attribute = null;
    if (fieldMin === "ageMin") {
      if (filter[fieldMin] != null || filter[fieldMax] != null) {
        attribute = "";
        attribute =
          filter[fieldMax] != null && filter[fieldMax].trim().length > 0
            ? 2019 - parseInt(filter[fieldMax])
            : 1900;
        attribute += ",";
        attribute +=
          filter[fieldMin] != null && filter[fieldMin].trim().length > 0
            ? 2019 - parseInt(filter[fieldMin])
            : 2019;
      }
    } else if (
      (filter[fieldMin] != null && filter[fieldMin].trim().length > 0) ||
      (filter[fieldMax] != null && filter[fieldMax].trim().length > 0)
    ) {
      attribute = "";
      attribute =
        filter[fieldMin] != null && filter[fieldMin].trim().length > 0
          ? filter[fieldMin]
          : min;
      attribute += ",";
      attribute +=
        filter[fieldMax] != null && filter[fieldMax].trim().length > 0
          ? filter[fieldMax]
          : max;
    }
    return attribute;
  };

  render() {
    const name = this.state.sortModified
      ? this.state.sort.name
      : this.props.sorted;
    return (
      <React.Fragment>
        <hr />
        <div className="d-flex flex-wrap bd-heightlight mb-3 flex-row">
          <div className="d-flex flex-column sort pr-5 flex-fill">
            <h5 className="ml-2">Sort By</h5>
            <form className="ml-3 mb-3" onSubmit={this.handleSortSubmit}>
              <div>
                Age:{" "}
                <input
                  type="radio"
                  name="date_of_birth-DESC"
                  checked={name === "date_of_birth-DESC"}
                  onChange={this.handleSort}
                />{" "}
                Ascending{" "}
                <input
                  type="radio"
                  name="date_of_birth-ASC"
                  checked={name === "date_of_birth-ASC"}
                  onChange={this.handleSort}
                />{" "}
                Descending
              </div>
              <div>
                Years In Office:{" "}
                <input
                  type="radio"
                  name="seniority-ASC"
                  checked={name === "seniority-ASC"}
                  onChange={this.handleSort}
                />{" "}
                Ascending{" "}
                <input
                  type="radio"
                  name="seniority-DESC"
                  checked={name === "seniority-DESC"}
                  onChange={this.handleSort}
                />{" "}
                Descending
              </div>
              <div>
                Party:{" "}
                <input
                  type="radio"
                  name="party-ASC"
                  checked={name === "party-ASC"}
                  onChange={this.handleSort}
                />{" "}
                Ascending{" "}
                <input
                  type="radio"
                  name="party-DESC"
                  checked={name === "party-DESC"}
                  onChange={this.handleSort}
                />{" "}
                Descending
              </div>
              <div>
                State:{" "}
                <input
                  type="radio"
                  name="state-ASC"
                  checked={name === "state-ASC"}
                  onChange={this.handleSort}
                />{" "}
                Ascending{" "}
                <input
                  type="radio"
                  name="state-DESC"
                  checked={name === "state-DESC"}
                  onChange={this.handleSort}
                />{" "}
                Descending
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
          <div className="d-flex flex-column filter pr-5 flex-fill">
            <h5>Filter By</h5>
            <form
              className="ml-3"
              action="/representatives/filter"
              onSubmit={this.handleFilterSubmit}
            >
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Age
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="ageMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.ageMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="ageMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.ageMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Years In Office
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="yearsInOfficeMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.yearsInOfficeMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="yearsInOfficeMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.yearsInOfficeMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <label className="input-group-text">Party</label>
                </div>
                <select
                  className="custom-select"
                  name="party"
                  onChange={this.handleFilter}
                >
                  <option>Choose...</option>
                  <option value="Democrat">Democrat</option>
                  <option value="Republican">Republican</option>
                  <option value="Independent">Independent</option>
                </select>
              </div>
              <State handleFilter={this.handleFilter} />
              <div className="d-flex mt-3 justify-content-end">
                <button className="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default representativeSortFilter;
