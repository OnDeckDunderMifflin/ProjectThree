import React, {Component} from "react";
import "./ActiveBar.css";

class ActiveBar extends Component {

	render() {
    const barClass = this.props.isActive ? 'green-bar' : 'active-bar';

    	return <div className={barClass}></div>
	}	
}

export default ActiveBar;