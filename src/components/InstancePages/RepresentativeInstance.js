import React from "react";

class RepresentativeInstance extends React.Component{

    constructor(props){
        super(props)
    };

    render(){
    var name = this.props.location.state.first_name
    console.log(this.props.location.state)
    return(
        <div>
        <p>{name}</p>
        </div>
    );
    }
}

export default RepresentativeInstance;