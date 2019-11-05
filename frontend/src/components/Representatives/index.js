import React, { Component } from "react";
import { Link } from "react-router-dom";
import RepresentativeSortFilter from "./RepresentativeSortFilter";
import Representative from "./Representative";
import Pages from "../Pages";

import "./css/Representatives.css";

class Representatives extends Component {
  getAge = birthDateString => {
    var todayDate = new Date();
    var birthDate = new Date(birthDateString);
    var age = todayDate.getFullYear() - birthDate.getFullYear();
    var monthDiff = todayDate.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };
  getEnacted = enacted => {
    if (enacted != null) {
      return enacted;
    }
    return "N/A";
  };

  getBillType = billType => {
    if (billType === "hr") {
      return "House of Representatives";
    }
    return "Senate";
  };

  getParty = sponsor_party => {
    if (sponsor_party === "D") {
      return "Democrat";
    }
    return "Republican";
  };
  state = {
    collapse: true,
    representatives: [],
    metaData: {
      currentPage: 1,
      lastPage: 1
    },
    searchQueries: [],
    searchField: ""
  };

  handleCollapse = () => {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  };

  search = (representative) => {
    // console.log(this.state.searchQueries[0])
    //Add Fetch to api to set representatives and metadata here
    console.log()
    if(this.state.searchQueries.length > 0){
      var found = true
      this.state.searchQueries.forEach((elem)=>{
        var query = elem.toLowerCase()
        if(!(representative.first_name.toLowerCase().includes(query) ||
            representative.last_name.toLowerCase().includes(query) ||
            this.getAge(representative.date_of_birth).toString().includes(query) ||
            representative.seniority.toString().includes(query) ||
            this.getParty(representative.party).toLowerCase().includes(query) ||
            representative.state.toLowerCase().includes(query) ||
            representative.district.toLowerCase().includes(query)
        
        ))
          found = false
        // if( ! (
        //   representative.first_name.toLowerCase().includes(query) ||
        //   representative.last_name.toLowerCase().includes(query))
        
        
        // ){
        //   return false
        // }
      })
     }
    else return true
    return found
  }

  componentDidMount() {
    const querystring = this.props.location.search;
    const pathname = this.props.location.pathname;
    const url = `https://api.foodmeonce.me${pathname}${querystring}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let representatives = data["data"];
        let metaData = data["metaData"];
        this.setState({ representatives, metaData });
      })
      .catch(console.log);
  }
  render() {

    var tempRender = this.state.representatives.filter( (representative) => this.search(representative) )
    var representativesRendered = tempRender.map(
      (representative, i) => {
        var rep_image = "";
        if (representative.first_name != null) {
          rep_image =
            "https://theunitedstates.io/images/congress/original/" +
            representative.id +
            ".jpg";
        }
        return (
          <a
            href={`/Representatives/instance/${representative.id}`}
            className="button-container"
          >
            <Representative
              image={rep_image}
              name={representative.first_name + " " + representative.last_name}
              age={this.getAge(representative.date_of_birth)}
              yearsInOffice={representative.seniority}
              party={this.getParty(representative.party)}
              state={representative.state}
              district={representative.district}
            />
          </a>
        );
      }
    );
    //Splice total list to get only the ones for the page we are on
    //representativesRendered = representativesRendered.splice(0,8)
    return (
      <div className="representatives-model">
        
        <div className="sorting-container">
        
          <div className="d-flex flex-row justify-content-between">
            <h3 className="ml-1">Representatives</h3>
            <input class="form-control" type="text" 
            onKeyPress={event =>{
              if(event.key === 'Enter') {
                // console.log(this.state.searchField)

                var value = this.state.searchField
                if(value=== "")
                  this.setState(prevState => ({
                  searchQueries: []
                }));
                else{
                  this.setState(prevState => ({
                  searchQueries: value.split(" ")
                }));
              }
                //console.log(this.state.searchQueries)
              }
            }}

            onChange={event => {
                // console.log(event.target.value)
                this.setState({
                  searchField: event.target.value
                })
                // console.log(this.state)
            }}
            placeholder="Search" 
            style={{marginLeft:"15%"}}aria-label="Search"/>
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse}
            >
              {this.state.collapse ? "-" : "+"}
            </button>
          </div>
          {this.state.collapse && <RepresentativeSortFilter />}
        </div>
        <div className="representatives-container">
          {representativesRendered.slice(0, 4)}
        </div>
        <div className="representatives-container">
          {representativesRendered.slice(4, 8)}
        </div>
        <Pages
          url={this.props.location.pathname}
          querystring={this.props.location.search}
          current={this.state.metaData.currentPage}
          lastPage={this.state.metaData.numPages}
        />
      </div>
    );
  }
}

export default Representatives;
