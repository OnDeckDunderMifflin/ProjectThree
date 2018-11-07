import React, { Component } from "react";
import "./JoinForm.css";

class JoinForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      code: "",
      numPlayers: ""
    }
  }

  componentDidMount = () => {
    console.log("joinform props", this.props)
  }


  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    //limit the gamecode input to 5 characters
    if(name === 'code'){
      this.setState({[name]: value.length < 6 ? value : value.slice(0, 5)})
      return;
    }
    this.setState({[name]: value});
  };

  handlePlay = event => {
    event.preventDefault();

    const code = this.state.code;

    this.props.findGame(code, response =>{
      if(response.status === "success"){
        this.props.renderNewComponent("game", {code: code});
      } else {
        console.log(response);
      }
    });
  };

  render() {
    return (
      <form className="joinform">
        <div className="form-group">
          <h1>JOIN A GAME</h1>
          <input
            value={this.state.code}
            type="text"
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="GAME CODE"
            name="code"
            id="joingame-input"
          />
          <button
            type="submit"
            className="join-btn"
            id="join-btn"
            onClick={this.handlePlay}
          >
            Play!
          </button>

        </div>
      </form>
    )
  }
}

export default JoinForm;