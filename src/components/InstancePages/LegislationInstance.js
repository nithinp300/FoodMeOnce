import React from "react";

class LegislationInstance extends React.Component{

    constructor(props){
        super(props)
    };

    render(){
    var name = this.props.location.state.short_title
    console.log(this.props.location.state)
    return(
        <div>
        <p>{name}</p>
        </div>
    );
    }
}

export default LegislationInstance;