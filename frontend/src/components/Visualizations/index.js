import React, { Component } from "react";
import CongressionalDistricts from "./CongressionalDistricts";
import LegislationHistogram from "./LegislationHistogram";
import * as d3 from "d3";
import RepresentativesBubbleChart from "./RepresentativesBubbleChart";
import styling from "./css/styling.css";
import DistrictSortFilter from "../Districts/DistrictSortFilter";

class Visualizations extends React.Component {
  state = {
    data: [12, 5, 6, 6, 9, 10],
    width: 400,
    height: 300,
    scale: 20,
    collapse_1: true,
      collapse_2: true,
      collapse_3: true
  };

    handleCollapse_1 = () => {
    this.setState(prevState => ({
        collapse_1: !prevState.collapse_1
    }));
  };
    handleCollapse_2 = () => {
    this.setState(prevState => ({
        collapse_2: !prevState.collapse_2
    }));
  };
    handleCollapse_3 = () => {
    this.setState(prevState => ({
        collapse_3: !prevState.collapse_3
    }));
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <h1 className="text-center mt-2">Congressional District SNAP/Poverty Ratio Heat Map</h1>
          <div className="sorting-container">
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse_1}
            >
              {this.state.collapse_1 ? "-" : "+"}
            </button>
              {this.state.collapse_1 && (
            <CongressionalDistricts/>)}
            <p>This visualization shows us the ratio of SNAP (Supplemental Nutrition Assistance Program) to the percentage of people below the poverty line per congressional district. A ratio of 1 or more shows good coverage, and well implemented programs for assistance.</p>
          </div>

        <h1 className="text-center mt-2">Legislation by Representative Bubble Chart</h1>
                  <div className="sorting-container">
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse_2}
            >
              {this.state.collapse_2 ? "-" : "+"}
            </button>
              {this.state.collapse_2 && (
            <RepresentativesBubbleChart/>)}
            <p>This visualization shows us the number of bills (pertaining to food security) that current (116th Congress) House Reps and Senators have sponsored.</p>
          </div>
        <h1 className="text-center mt-2">Legislations by State Histogram</h1>
                    <div className="sorting-container">
            <button
              className="ml-2 btn btn-secondary"
              onClick={this.handleCollapse_3}
            >
              {this.state.collapse_3 ? "-" : "+"}
            </button>
              {this.state.collapse_3 && (
                    <LegislationHistogram
          data={this.state.data}
          width={this.state.width}
          height={this.state.height}
          scale={this.state.scale}
        />)}
        <p>This histogram indicates to us where the representatives who sponsored the legislation are from (by state).</p>
          </div>
        <h1 className="text-center mt-2">What do these visualizations tell us?</h1>
          <h1>Congressional District SNAP/Poverty Ratio Heat Map</h1>

<p>This visualization is a heat map that shows the ratio of people that are supported by SNAP, to the percentage of individuals underneath the national poverty line by congressional district. The map is divided by congressional district and colored with colors ranging from green (light green is best) to red (dark red is worst) to make it very clear which districts have better support versus those which do not. The data is dynamically requested from our API  (https://api.foodmeonce.me/Districts).
The call returns a list of each congressional district which is parsed and the attributes: SNAP and Poverty Rate are stored and subsequently divided to give us the final ratio as a decimal number.  The final ratio along with the district identifier are mapped to the congressional district map image through the SVG structure. The ratio determines the color of the district.

<p>
     This is our most complex visualization, but also one of the most interesting. Users are quickly able to determine which districts have poor food security for the economically disadvantaged. We focused on the SNAP:Poverty ratio as it is used as a good indicator of food assistance provided to the poorer sections of society. Through this ratio, we are essentially creating a new way to track food security, by showing the people who need food assistance the most, and the areas where they are not being helped out. For instance, it is immediately apparent that portions of Texas have some of the lowest rates out of the entire nation, and could be used to encourage those congressional leaders to try to bring more support to their districts. We hope that through this map users can see if the districts they call home are in need of greater food support, and take action to encourage change.
</p>
  <p>  The map looked at conjunction with the histogram and bubble charts lets the user look at districts/states with low food security and then compare it to the legislations by representative/state. The user can then determine if the legislation(s) have a positive/negative impact. They can use this information to then navigate to other pages of the website to learn more about the specific legislation, districts or representatives.</p>
</p>

<h1>Legislation by Representative Bubble Chart</h1>
          <p>
This visualization is a bubble chart. It shows the legislation count by representative. The more bills the representative has sponsored, the larger the bubble. It is colored based off the party the representative is from (red is Republican, blue is Democratic, grey is Independent). The data is dynamically requested from the backend database via our API.
The API call (https://api.foodmeonce.me/Legislations?limit=500)
brings back all the legislation and then is parsed out by the field ‘sponsor_name’. For each legislation by a sponsor_name, the count for that representative is incremented by one. The  ‘sponsor_party’ and ‘sponsor_state’ fields are also stored for each ‘sponsor_name’. The ‘sponsor_party’ field is used to determine the color of the bubble. In the bubble, the ‘sponsor_name’, ‘sponsor_state’ and the number of legislations they have sponsored is displayed.
          </p>
<p>This visualisation is not as complex as the previous one. However, a user can immediately draw some interesting observations. Majority of the representatives that have introduced legislations belong to the democratic party. Also, Cory Booker and Robin Kelly stand out as the only elected officials that have sponsored four legislations each. Elected officials from the Republican party have sponsored up to two legislations. In conjunction with the heat map, we can see that a large number of representatives from New York and California have sponsored legislation. This is because New York and California have a lot of congressional districts with poor SNAP:Poverty Rate ratios. Texas has a large amounts of geographical areas with poor SNAP:Poverty Rate ratios as well. However, there is only one representative from Texas that has sponsored legislation to address food scarcity. This is indicative of a serious problem that needs to be addressed, a conclusion which a user can then use to communicate to their representatives. Representatives from Illinois, New Jersey, Ohio and Wisconsin stand out for sponsoring more than three legislations. This is important because these states have significant percentage of geographic areas with poor SNAP:Poverty Rate ratios.
          </p>
          <h1>Legislation by State Histogram</h1>

<p>This visualization is a histogram. It shows the legislation count by state. It does not display all states, but only those who have sponsored at minimum 1 bill. The data is dynamically requested from the backend database via our API. The API call (https://api.foodmeonce.me/Legislations)
 brings back all the legislation and then is parsed out by the field ‘sponsor_state’. For each legislation in a sponsor_state, the count for that state is incremented by one. After the entire response has been parsed and the counts stored, we render the histogram. The color of the bars becomes darker as the count gets higher.
</p><p>
The visualization itself is fairly simple, however in conjunction with the heat map on the same page, we can arrive at some interesting observations. From the heat map we can see that the state of New York has introduced the most legislation into the House/Senate. However, they still have about 40% of their geographical area (2 districts) with very poor SNAP:Poverty Rate ratios. Similarly, with Ohio, California and Illinois, their representatives have sponsored more than the average number of bills pertaining to food security yet have several districts with extremely poor ratios.
      </p><p>
It also becomes clear that states/districts (West Virginia, Virginia, Connecticut, Arizona, Alabama, Vermont etc.) with a low population density do not sponsor/do not feel the need to introduce bills of this nature.
      </p> </div>
    );
  }
}

export default Visualizations;
