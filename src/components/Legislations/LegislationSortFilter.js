import React, { Component } from 'react';

class LegislationSortFilter extends Component {
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
                        <form className="ml-3 mb-3" action="/legislations/sort">
                        <div><input type="radio" name="year" checked={this.state.sort.name === 'year'} onChange={this.handleSort} /> Year</div>
                        <div><input type="radio" name="status" checked={this.state.sort.name === 'status'} onChange={this.handleSort} /> Status</div>
                        <div><input type="radio" name="houseOfRepresentative" checked={this.state.sort.name === 'houseOfRepresentative'} onChange={this.handleSort} /> Representative</div>
                        <div><input type="radio" name="billType" checked={this.state.sort.name === 'billType'} onChange={this.handleSort} /> Bill Type</div>
                        <div><input type="radio" name="sponsors" checked={this.state.sort.name === 'sponsors'} onChange={this.handleSort} /> Sponsor/s</div>
                        <div className="d-flex justify-content-end"><button className="btn btn-primary">Apply</button></div>
                        </form>
                    </div>
                    <div className="d-flex flex-column filter pr-5 flex-fill">
                        <h5>Filter By</h5>
                        <form className="ml-3" action="/legislations/filter">
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Year</span>
                            </div>
                            <input type="text" className="form-control" name="yearMin" onChange={this.handleFilter} value={this.state.filter.yearMin} placeholder="Minimum" />
                            <input type="text" className="form-control" name="yearMax" onChange={this.handleFilter} value={this.state.filter.yearMax} placeholder="Maximum" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <label className="input-group-text">Status</label>
                            </div>
                            <select className="custom-select" name="status" onChange={this.handleFilter} value={this.state.filter.status}>
                                <option>Choose...</option>
                                <option value="1">Pending</option>
                                <option value="2">1</option>
                                <option value="3">2</option>
                            </select>
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Representative</span>
                            </div>
                            <input type="text" className="form-control" name="houseOfRepresentativeMin" onChange={this.handleFilter} value={this.state.filter.houseOfRepresentativeMin} placeholder="Representative" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Bill Type</span>
                            </div>
                            <input type="text" className="form-control" name="billTypeMin" onChange={this.handleFilter} value={this.state.filter.billTypeMin} placeholder="Bill Type" />
                        </div>
                        <div className="input-group input-group-sm">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">Sponsor/s</span>
                            </div>
                            <input type="text" className="form-control" name="sponsorsMin" onChange={this.handleFilter} value={this.state.filter.sponsorsMin} placeholder="Sponsor(s)" />
                        </div>
                        <div className="d-flex mt-3 justify-content-end"><button className="btn btn-primary">Apply</button></div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LegislationSortFilter;