import React, { Component } from "react";
import Representative from "./Representative";
import District from "./District";
import Legislation from "../Legislations/Legislation"
import "../Representatives/css/Representatives.css"
import "../Districts/css/District.css"
import Highlight from "react-highlighter"
class SearchPage extends Component {

    state = {
        collapse: true,
        representatives: [],
        districts:[],
        legislations:[]
      };
      componentDidMount() {
        //Fetch Representatives
        const url = `https://api.foodmeonce.me/Representatives`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            let representatives = data["data"];
            //let metaData = data["metaData"];
            this.setState({ representatives});
          })
          .catch(console.log);
        //Districts
        fetch("http://api.foodmeonce.me/Districts")
        .then(response => response.json())
        .then(data => {
            let districts = data["data"];
            this.setState({ districts});
        })
        .catch(console.log);


         //Legislation
         fetch("http://api.foodmeonce.me/Legislations")
         .then(response => response.json())
         .then(data => {
           let legislations = data["data"];
           this.setState({ legislations});
         })
         .catch(console.log);
        }

       
    render(){
        var representativesRendered = this.state.representatives.map(
            (representative, i) => {
              var rep_image = "";
              if (representative.first_name != null) {
                rep_image =
                  "https://theunitedstates.io/images/congress/original/" +
                  representative.id +
                  ".jpg";
              }
              console.log(representative.state)
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
                    district={this.getDistrict(representative.district)}
                    type_flag = {this.getType(representative.type_flag)}
                  />
                </a>
              );
            }
          );
          //Render the Districts
          let districtsRendered = [];
          if(this.state.districts !== null && this.state.districts !== undefined){
          if (this.state.districts.length > 0)
          districtsRendered = this.state.districts.map((district, i) => {
            return (
            <a
                key={i}
                href={`/Districts/Instance/${district.id}`}
                className="button-container"
            >
                <District
                name={this.getDistrictName(
                    district.state,
                    district.congressional_district
                )}
                number={district.congressional_district}
                population={district.population}
                medianIncome={district.mean_income}
                avgAge={district.median_age}
                stateAbbreviation={district.state_abbreviation}
                genderRatio={district.gender_ratio}
                representative={district.full_name}
                senators={district.senators}
                peoplePerSquareMile={district.peoplePerSquareMile}
                povertyRate={district.povertyRate}
                numHouseholds={district.numHouseholds}
                id={district.id}
                wikipedia={district.wikipedia}
                />
            </a>
            );
        });
    }

        //Render Legislation
        let legislationsRendered = []
        console.log("LEG")
        console.log(this.state.legislations)
        if(this.state.legislations !== null && this.state.legislations !== undefined){
          legislationsRendered = this.state.legislations.map(
          (legislation, i) => {
            return (
              <a
                key={i}
                href={`../Legislations/Instance/${legislation.id}`}
                className="button-container"
              >
                <Legislation
                  name={legislation.short_title}
                  year={legislation.introduced_date}
                  status={this.getStatus(legislation.enacted)}
                  enacted_Year={this.getEnacted(legislation.enacted)}
                  houseOfRepresentative={this.getLegislationParty(legislation.sponsor_party)}
                  billType={this.getBillType(legislation.bill_type)}
                  sponsors={legislation.sponsor_name}
                />
              </a>
            );
          }
        );
        }

        return (
          
        <div className="text-center">
        <h1>THIS WILL BE THE SEARCH PAGE</h1>
        <div style={{paddingBottom:"5%", paddingTop:"5%"}}>
        <h4>Representatives</h4>
        <Representative header/>
          {representativesRendered}
        </div>        
        <h4>Districts </h4>
        <div style={{paddingBottom:"5%"}}>
        <District header />
        {districtsRendered}
        </div>
        <div style={{paddingBottom:"5%"}}>
        <h4>Legislation </h4>
        <Legislation header/>
        {legislationsRendered}
        </div>
        </div>
      
    );
    }
    //Methods needed for various models

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
      if (billType === "hr") {
        return "House of Representatives";
      }
      return "Senate";
    };
  
    getLegislationParty = sponsor_party => {
      if (sponsor_party === "D") {
        return "Democratic";
      }
      return "Republican";
    };


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
    
      getDistrict = district => {
        if (district) {
          return district;
        }
        return "N/A";
      }
    
      getType = type_flag => {
        if (type_flag) {
          return "House Rep.";
        }
        return "Senator";
      }
      getDistrictName = (state, districtNum) => {
        if (districtNum === "00") {
          return state + " At Large Congressional District ";
        }
        return state + " Congressional District " + districtNum;
      };

}

export default SearchPage;
