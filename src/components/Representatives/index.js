import React, { Component } from "react";

import RepresentativeSortFilter from './RepresentativeSortFilter';
import Representative from './Representative';

import './css/Representatives.css';

class Representatives extends Component {
  state = {
    collapse: true,
    representatives : [
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
      // {
      //   name: 'example name',
      //   age: '35',
      //   yearsInOffice: '5 years',
      //   party: 'republic/democratic',
      //   stateDistrict: 'state/district',
      // },
    ]
  }

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  }

  componentDidMount() {
    fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
      method: 'GET',
      headers: {
        'X-API-Key': 'eqgLGZRNuOktoYkIpRdonPmtq4zIKokpsvT0EpN6'
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({representatives: data.results[0].members})
    })
    .catch(console.log)
  }
  render() {
    const representativesRendered = this.state.representatives.map((representative, i) => {
      return (
          <Representative
              key={i}
              name={representative.first_name + " " + representative.last_name}
              age={representative.date_of_birth}
              yearsInOffice={representative.seniority}
              party={representative.party}
              stateDistrict={representative.state}
          />
      );
    });
    return (
      <div className="representatives-model">
        <div className="sorting-container">
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Representatives</h3>
            <button className="ml-2 btn btn-secondary" onClick={this.handleCollapse}>
              {this.state.collapse ? '-' : '+'}
            </button>
          </div>
          { this.state.collapse && <RepresentativeSortFilter /> }
        </div>
        <div
          className="representatives-container d-flex justify-content-center flex-wrap bd-highlight mb-3"
        >
            { representativesRendered }
        </div>
      </div>
    );
  }
}

export default Representatives;
