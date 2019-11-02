import React, { Component } from "react";

class LegislationSortFilter extends Component {
  state = {
    sort: {},
    filter: []
  };

  handleSort = e => {
    let newSort = {};
    newSort.name = e.target.name;
    newSort.order = "ASC";
    this.setState({ sort: newSort });
  };

  handleSortSubmit = e => {
    e.preventDefault();
    const { name, order } = this.state.sort;
    const url = `/Legislations/sort?attribute=${name}&order=${order}`;
    window.location = url;
  };

  handleFilter = e => {
    const field = e.target.name;
    let filter = this.state.filter;
    filter[field] = e.target.value;
    this.setState({ filter });
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
                  name="introduced_date"
                  checked={this.state.sort.name === "introduced_date"}
                  onChange={this.handleSort}
                />{" "}
                Introduced Year
              </div>
              <div>
                <input
                  type="radio"
                  name="enacted"
                  checked={this.state.sort.name === "enacted"}
                  onChange={this.handleSort}
                />{" "}
                Status
              </div>
              <div>
                <input
                  type="radio"
                  name="sponsor_party"
                  checked={this.state.sort.name === "sponsor_party"}
                  onChange={this.handleSort}
                />{" "}
                Party
              </div>
              <div>
                <input
                  type="radio"
                  name="bill_type"
                  checked={this.state.sort.name === "bill_type"}
                  onChange={this.handleSort}
                />{" "}
                Bill Type
              </div>
              <div>
                <input
                  type="radio"
                  name="sponsor_name"
                  checked={this.state.sort.name === "sponsor_name"}
                  onChange={this.handleSort}
                />{" "}
                Sponsor(s)
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
          <div className="d-flex flex-column filter pr-5 flex-fill">
            <h5>Filter By</h5>
            <form className="ml-3" action="/legislations/filter">
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Introduced Year
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="yearMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.yearMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="yearMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.yearMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <label className="input-group-text">Status</label>
                </div>
                <select
                  className="custom-select"
                  name="status"
                  onChange={this.handleFilter}
                  value={this.state.filter.status}
                >
                  <option>Choose...</option>
                  <option value="1">Pending</option>
                  <option value="2">1</option>
                  <option value="3">2</option>
                </select>
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Enacted Year
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="enacted_YearMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.enacted_YearMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="enacted_YearMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.enacted_YearMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Party
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="houseOfRepresentativeMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.houseOfRepresentativeMin}
                  placeholder="Representative"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Bill Type
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="billTypeMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.billTypeMin}
                  placeholder="Bill Type"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Sponsor(s)
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="sponsorsMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.sponsorsMin}
                  placeholder="Sponsor(s)"
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

export default LegislationSortFilter;
