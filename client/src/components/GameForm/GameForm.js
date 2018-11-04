import React, { Component } from "react";
import "./GameForm.css";
import axios from "axios";

class GameForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      numPlayers: ""
    }
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  handleCreate = event => {
    event.preventDefault();
    console.log(this.props)

    const data = {
      numPlayers: this.state.numPlayers,
      deckName: this.props.deckName,
      maker: this.props.user
    }

    axios.post("/api/creategame", data).then(response => {
      if(response.data.status === "success"){
        this.props.renderNewComponent("game", {code: response.data.gameCode})
      } else {
        console.log(response.data);
      }
    });
  };

  render() {
    return (
      <form className="gameform">
        <div className="form-group">
        
          <input
            value={this.state.numPlayers}
            type="text"
            className="form-control"
            onChange={this.handleInputChange}
            placeholder="NUMBER OF PLAYERS"
            name="numPlayers"
            id="startgame-input"
          />
          <button
            type="submit"
            className="start-btn"
            id="start-btn"
            onClick={this.handleCreate}
          >
            Create
          </button>
        </div>
      </form>
    )
  }
}

export default GameForm;