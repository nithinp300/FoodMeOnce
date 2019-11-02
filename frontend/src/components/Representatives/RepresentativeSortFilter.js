import React, { Component } from "react";

class representativeSortFilter extends Component {
  state = {
    sort: {},
    filter: [],
    url: ""
  };

  handleSort = e => {
    let newSort = {};
    newSort.name = e.target.name;
    newSort.order = "ASC";
    this.setState({ sort: newSort });
  };

  handleFilter = e => {
    const field = e.target.name;
    let filter = this.state.filter;
    filter[field] = e.target.value;
    this.setState({ filter });
  };

  handleSortSubmit = e => {
    e.preventDefault();
    const { name, order } = this.state.sort;
    const url = `/Representatives/sort?attribute=${name}&order=${order}`;
    window.location = url;
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <hr />
        <div className="d-flex flex-wrap bd-heightlight mb-3 flex-row">
          <div className="d-flex flex-column sort pr-5 flex-fill">
            <h5 className="ml-2">Sort By</h5>
            <form className="ml-3 mb-3" onSubmit={this.handleSortSubmit}>
              <div>
                <input
                  type="radio"
                  name="date_of_birth"
                  checked={this.state.sort.name === "date_of_birth"}
                  onChange={this.handleSort}
                />{" "}
                Age
              </div>
              <div>
                <input
                  type="radio"
                  name="seniority"
                  checked={this.state.sort.name === "seniority"}
                  onChange={this.handleSort}
                />{" "}
                Years In Office
              </div>
              <div>
                <input
                  type="radio"
                  name="party"
                  checked={this.state.sort.name === "party"}
                  onChange={this.handleSort}
                />{" "}
                Party
              </div>
              <div>
                <input
                  type="radio"
                  name="state"
                  checked={this.state.sort.name === "state"}
                  onChange={this.handleSort}
                />{" "}
                State
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
              onSubmit={this.handleSubmit}
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
                  value={this.state.filter.party}
                >
                  <option>Choose...</option>
                  <option value="democratic">Democratic</option>
                  <option value="republic">Republic</option>
                </select>
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    State
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  onChange={this.handleFilter}
                  value={this.state.filter.state}
                  placeholder="State"
                />
              </div>
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
