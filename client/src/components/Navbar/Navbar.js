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
    const protoClass = props.active === "proto" ? "active" : "";

    this.state = {
      isOpen: false,
      playClass: playClass,
      protoClass: protoClass
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handlePlayClick = () => {
    this.props.renderNewComponent("home", {});
  }

  handleCreateClick = () => {
    this.props.renderNewComponent('deckmake', {})
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

                    <button id="play" className={this.state.playClass} onClick={this.handlePlayClick}>Play</button>
                    <button id="prototype" className={this.state.protoClass} onClick={this.handleCreateClick}>Create</button>
                    
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