import React, { Component } from 'react';

class DistrictSortFilter extends Component {
    state = {
        sort: {},
        filter: []
    };

    handleSort = (e) => {
        let newSort = {};
        newSort.name = e.target.name;
        newSort.order = 'ASC';
        this.setState({ sort: newSort })
    }

    handleFilter = (e) => {
        const field = e.target.name;
        let filter = this.state.filter;
        filter[field] = e.target.value;
        this.setState({ filter });
    }

    render() {
        return (
            <React.Fragment>
                <hr />
                <div className="d-flex flex-wrap bd-heightlight mb-3 flex-row">
                    <div className="d-flex flex-column sort pr-5 flex-fill">
                        <h5 className="ml-2">Sort By</h5>
                        <form className="ml-3 mb-3" action="/Districts/sort">
                        <div><input type="radio" name="avgIncome" checked={this.state.sort.name === 'avgIncome'} onChange={this.handleSort} /> Average Income</div>
                        <div><input type="radio" name="avgEducation" checked={this.state.sort.name === 'avgEducation'} onChange={this.handleSort} /> Average Education Level</div>
                        <div><input type="radio" name="avgAge" checked={this.state.sort.name === 'avgAge'} onChange={this.handleSort} /> Average Age</div>
                        <div><input type="radio" name="genderRatio" checked={this.state.sort.name === 'genderRatio'} onChange={this.handleSort} /> Gender Ratio</div>
                        <div><input type="radio" name="distToSupply" checked={this.state.sort.name === 'distToSupply'} onChange={this.handleSort} /> Distance to food supply</div>
                        <div className="d-flex justify-content-end"><button className="btn btn-primary">Apply</button></div>
                        </form>
                    </div>
                    <div className="d-flex flex-column filter pr-5 flex-fill">
                        <h5>Filter By</h5>
                        <form className="ml-3" action="/Districts/filter">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Average Income</span>
                            </div>
                            <input type="text" className="form-control" name="avgIncomeMin" onChange={this.handleFilter} value={this.state.filter.avgIncomeMin} placeholder="Minimum" />
                            <input type="text" className="form-control" name="avgIncomeMax" onChange={this.handleFilter} value={this.state.filter.avgIncomeMax} placeholder="Maximum" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Average Education Level</span>
                            </div>
                            <input type="text" className="form-control" name="avgEducationMin" onChange={this.handleFilter} value={this.state.filter.avgEducationMin} placeholder="Minimum" />
                            <input type="text" className="form-control" name="avgEducationMax" onChange={this.handleFilter} value={this.state.filter.avgEducationMax} placeholder="Maximum" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Average Age</span>
                            </div>
                            <input type="text" className="form-control" name="avgAgeMin" onChange={this.handleFilter} value={this.state.filter.avgAgeMin} placeholder="Minimum" />
                            <input type="text" className="form-control" name="avgAgeMax" onChange={this.handleFilter} value={this.state.filter.avgAgeMax} placeholder="Maximum" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Gender Ratio</span>
                            </div>
                            <input type="text" className="form-control" name="genderRatioMin" onChange={this.handleFilter} value={this.state.filter.genderRatioMin} placeholder="Minimum" />
                            <input type="text" className="form-control" name="genderRatioMax" onChange={this.handleFilter} value={this.state.filter.genderRatioMax} placeholder="Maximum" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Distance to food supply</span>
                            </div>
                            <input type="text" className="form-control" name="distToSupplyMin" onChange={this.handleFilter} value={this.state.filter.distToSupplyMin} placeholder="Minimum" />
                            <input type="text" className="form-control" name="distToSupplyMax" onChange={this.handleFilter} value={this.state.filter.distToSupplyMax} placeholder="Maximum" />
                        </div>
                        <div className="d-flex mt-3 justify-content-end"><button className="btn btn-primary">Apply</button></div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DistrictSortFilter;