import React from "react";

class DistrictInstance extends React.Component{

    constructor(props){
        super(props)
    };

    render(){
    var name = this.props.location.state.avgIncome
    console.log(this.props.location.state)
    return(
        <div>
        <p>{name}</p>
        </div>
    );
    }
}

export default DistrictInstance;