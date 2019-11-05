import React, { Component } from "react";

class DistrictSortFilter extends Component {
  state = {
    sort: {},
    filter: {},
    redirect: false,
    url: ""
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
    const url = `/Districts/sort?attribute=${name}&order=${order}`;
    window.location = url;
  };

  handleFilter = e => {
    const field = e.target.name;
    let filter = this.state.filter;
    filter[field] = e.target.value;
    this.setState({ filter });
  };

  handleFilterSubmit = e => {
    e.preventDefault();
    let url = "/Districts/filter?";
    let firstAttribute = true;
    const population = this.getFilteringAttributes(
      "populationMin",
      "populationMax"
    );
    const median_income = this.getFilteringAttributes(
      "medianIncomeMin",
      "medianIncomeMax"
    );
    const median_age = this.getFilteringAttributes("avgAgeMin", "avgAgeMax");
    const gender_ratio = this.getFilteringAttributes(
      "genderRatioMin",
      "genderRatioMax"
    );

    if (population) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "population=" + population;
    }
    if (median_income) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "median_income=" + median_income;
    }
    if (median_age) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "median_age=" + median_age;
    }
    if (gender_ratio) {
      if (firstAttribute) {
        firstAttribute = false;
      } else {
        url += "&";
      }
      url += "gender_ratio=" + gender_ratio;
    }
    window.location = url;
  };

  getFilteringAttributes = (fieldMin, fieldMax) => {
    const min = "0";
    const max = "2147483647";
    const filter = this.state.filter;
    let attribute = null;
    if (filter[fieldMin] != null || filter[fieldMax] != null) {
      attribute = "";
      attribute = filter[fieldMin] != null ? filter[fieldMin] : min;
      attribute += ",";
      attribute += filter[fieldMax] != null ? filter[fieldMax] : max;
    }
    return attribute;
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
                  name="population"
                  checked={this.state.sort.name === "population"}
                  onChange={this.handleSort}
                />{" "}
                Population
              </div>
              <div>
                <input
                  type="radio"
                  name="mean_income"
                  checked={this.state.sort.name === "mean_income"}
                  onChange={this.handleSort}
                />{" "}
                Median Income
              </div>
              <div>
                <input
                  type="radio"
                  name="median_age"
                  checked={this.state.sort.name === "median_age"}
                  onChange={this.handleSort}
                />{" "}
                Average Age
              </div>
              <div>
                <input
                  type="radio"
                  name="gender_ratio"
                  checked={this.state.sort.name === "gender_ratio"}
                  onChange={this.handleSort}
                />{" "}
                Gender Ratio
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Apply</button>
              </div>
            </form>
          </div>
          <div className="d-flex flex-column filter pr-5 flex-fill">
            <h5>Filter By</h5>
            <form className="ml-3" onSubmit={this.handleFilterSubmit}>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Population
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="populationMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.populationMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="populationMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.populationMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Median Income
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="medianIncomeMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.medianIncomeMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="medianIncomeMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.medianIncomeMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Average Age
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="avgAgeMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.avgAgeMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="avgAgeMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.avgAgeMax}
                  placeholder="Maximum"
                />
              </div>
              <div className="input-group input-group-sm">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">
                    Gender Ratio
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  name="genderRatioMin"
                  onChange={this.handleFilter}
                  value={this.state.filter.genderRatioMin}
                  placeholder="Minimum"
                />
                <input
                  type="text"
                  className="form-control"
                  name="genderRatioMax"
                  onChange={this.handleFilter}
                  value={this.state.filter.genderRatioMax}
                  placeholder="Maximum"
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

export default DistrictSortFilter;
