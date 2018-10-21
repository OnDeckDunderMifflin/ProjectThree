import "./SoloCardInfo.css";
import React, { Component } from "react";
// import Row from "../Row";
// import Col from "../Col";


class SoloCardInfo extends Component {

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;

    this.props.input(name, value, this.props.index)
  }

  render() {
    let formName = "card" + this.props.index.toString();
    let inputs = [];

    for (var i=0; i<this.props.numFields; i++) {
      inputs.push(
          <input key={i} name={"fieldInfo" + i} onChange={this.handleInputChange} type="text" className="deck" placeholder="Info"/>
      );
    };
  
    return (
      <form className="deck-form" name={formName}>
          {inputs}
      </form>
    )
  }
};

export default SoloCardInfo;
