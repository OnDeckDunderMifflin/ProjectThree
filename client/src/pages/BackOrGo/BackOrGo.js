import "./BackOrGo.css";
import React, { Component } from "react";
import axios from "axios";
import Container from "../../components/Container";
// import Navbar from "../../components/Navbar";
// import SoloCardInfo from "../../components/SoloCardInfo";

class BackOrGo extends Component {

  handleBackClick = () => {
    this.props.renderNewComponent("home", {});
  }

  handlePlayClick = () => {
    const dataObj = {numPlayers:1, deckName:this.props.deckName, maker:this.props.user.displayName}
    const self = this
    axios.post('/api/creategame', dataObj)
    .then(function (response) {
      console.log(response.data);
      if (response.data.status === "success"){
        self.props.renderNewComponent("game", {code: response.data.gameCode})
      } else {
        console.log(response.data);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div>
        <Container style={{ marginTop: 30 }}>
          <div>
            <button onClick={this.handleBackClick}>Go Home</button>
            <h4>OR</h4>
            <h4>Test your deck in a one-player game</h4>   
            <br/>         
            <button onClick={this.handlePlayClick}>Test</button>
          </div>
        </Container>
      </div>
    );
  }
};

export default BackOrGo;