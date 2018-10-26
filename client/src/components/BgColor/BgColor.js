import "./BgColor.css";
import React, { Component } from "react";
// import Row from "../Row";
// import Col from "../Col";


class BgColor extends Component {

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    
    this.props.input(name, value, this.props.index)
  }

  render() {
    let formName = "card" + this.props.index.toString();

    return (
      <form className="deck-form" name={formName}>
        <h4>Background color</h4>
        {/* <input name="bgColor" onChange={this.handleInputChange} className="deck" type="text" placeholder="R/B/G/Y"/> */}
        <div className="radio radio-w">
          <label>
            <input name="bgColor" type="radio" value="white" onChange={this.handleInputChange} className="deck" checked={true} />
            White
          </label>
        </div>
        <div className="radio radio-r">
          <label>
            <input name="bgColor" type="radio" value="red" onChange={this.handleInputChange} className="deck" />
            Red
          </label>
        </div>
        <div className="radio radio-b">
          <label>
            <input name="bgColor" type="radio" value="blue" onChange={this.handleInputChange} className="deck" />
            Blue
          </label>
        </div>
        <br/>
        <div className="radio radio-g">
          <label>
            <input name="bgColor" type="radio" value="green" onChange={this.handleInputChange} className="deck" />
            Green
          </label>
        </div>
        <div className="radio radio-y">
          <label>
            <input name="bgColor" type="radio" value="yellow" onChange={this.handleInputChange} className="deck" />
            Yellow
          </label>
        </div>
      </form>
    )
  }
};

export default BgColor;
