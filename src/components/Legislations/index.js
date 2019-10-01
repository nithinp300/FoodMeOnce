import React, { Component } from "react";

import LegislationSortFilter from './LegislationSortFilter';
import Legislation from './Legislation';

import './css/Legislations.css';

class Legislations extends Component {
  state = {
    collapse: true,
    legislations : [
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
      // {
      //   name: 'example legislation',
      //   year: '2019',
      //   status: 'pending',
      //   houseOfRepresentative: 'republic/democratic',
      //   billType: 'example',
      //   sponsors: 'example',
      // },
    ]
  }

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  }

  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/bills/search.json?query=%22food+access%22', {
      method: 'GET',
      headers: {
        'X-API-Key': 'eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6'
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({legislations: data.results[0].bills})
    })
    .catch(console.log)
  }
  render() {
    const legislationsRendered = this.state.legislations.map((legislation, i) => {
      return (
          <Legislation
              key={i}
              name={legislation.short_title}
              year={legislation.introduced_date}
              status={legislation.status}
              houseOfRepresentative={legislation.sponsor_party}
              billType={legislation.bill_type}
              sponsors={legislation.sponsor_name}
          />
      );
    });
    return (
      <div className="legislations-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Legislations</h3>
            <button className="ml-2 btn btn-secondary" onClick={this.handleCollapse}>
              {this.state.collapse ? '-' : '+'}
            </button>
          </div>
          { this.state.collapse && <LegislationSortFilter /> }
        </div>
        <div
          className="legislations-container d-flex justify-content-center flex-wrap bd-highlight mb-3"
        >
            { legislationsRendered }
        </div>
      </div>
    );
  }
}

export default Legislations;
