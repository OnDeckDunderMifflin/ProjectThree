import React, { Component } from 'react';
import Container from "../../components/Container";
import DeckPanel from "../../components/DeckPanel";
import "../../index.css";
import axios from "axios";
import JoinForm from "../../components/JoinForm";
import Navbar from "../../components/Navbar";

class About extends Component {
      constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { 
          collapse: false,
        };

      }

      componentDidMount = () => {
        axios.get("/api/decks").then(response => {
          let newState = this.state
          newState.deckNames = response.data;
          this.setState(newState);
        });
      }

      toggle() {
        this.setState({ collapse: !this.state.collapse });
      }

      handleLogout = () => {
        axios.post("/auth/logout").then(response => {
          if(response.data === "success"){
            this.props.setUser(null)
            this.props.renderNewComponent("login", {})
          }
        })
      };
    
      render(){
        let decks;
        this.state.deckNames
        ? decks = this.state.deckNames.map((name, index) => <DeckPanel {...this.props} key={index} deckName={name} />)
        : decks = 'nothing here yet'
    
        return (
          <div>
            <Navbar renderNewComponent={this.props.renderNewComponent} active={"play"}/>
            <Container style={{ marginTop: 30 }}>
            <JoinForm {...this.props} />
            </Container>
            <br /><br />
            <h1>START A NEW GAME</h1>
            <Container style={{ marginTop: 30 }}>
              {decks}
            <button id="logout" onClick={this.handleLogout}>LOGOUT</button>
            </Container>
          </div>
        )
      };
};

export default About;