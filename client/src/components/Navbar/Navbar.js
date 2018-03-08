import React from 'react';
import Container from "../Container";
import Row from "../Row";
import Col from "../Col";
import "./Navbar.css";
import {
  Navbar,
  Nav } from 'reactstrap';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    const playClass = props.active === "play" ? "active" : "";
    const protoClass = props.active === "Proto" ? "active" : "";

    this.state = {
      isOpen: false,
      playClass: playClass,
      ProtoClass: protoClass
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleLogout = () => {
    this.props.logout(response => {
      if(response.status === "success"){
        this.props.renderNewComponent("login", {});
      };
    });
  };

  handlePlayClick = () => {
    this.props.renderNewComponent("home", {activeNav: 'play'});
  }

  handleCreateClick = () => {
    this.props.renderNewComponent('deckmake', {activeNav: 'proto'})
  }

 render() {

    return (
      <div>
        <Container className="nav-container">
          <Row>
            <Col size="sm-12">
              <Navbar className="nav nav-tabs" light expand="md">
                <Nav className= "nav" navbar>
                  <ul className="nav nav-tabs">

                    <button id="play" className={this.setState.playClass} onClick={this.handlePlayClick}>Play</button>
                    <button id="deckmake" className={this.state.ProtoClass} onClick={this.handleCreateClick}>Prototype</button>
                    
                    <hr />

                  </ul>
                </Nav>
              </Navbar>
             </Col>
          </Row>
        </Container>
      </div>
    );
  }
}