import React, { Component } from "react";
import Container from "../../components/Container";
import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";
import Row from "../../components/Row";
import Col from "../../components/Col";
import { Collapse, Button} from 'reactstrap';
import "../../index.css";

class Login extends Component {
      constructor(props) {
        super(props);
        this.showSignup = this.showSignup.bind(this);
        this.showLogin = this.showLogin.bind(this);
        this.state = { 
          collapse: false,
          active: true,
          signinClass: "signin selected",
          signupClass: "signup" 
        };
      }

    showSignup() {
      let newstate = this.state
      newstate.signupClass = "signup selected"
      newstate.signinClass = "signin"
      newstate.collapse = true
      this.setState(newstate);
    }

    showLogin() {
      let newstate = this.state
      newstate.signinClass = "signin selected"
      newstate.signupClass = "signup"
      newstate.collapse = false
      this.setState(newstate);
    }

      componentDidMount = () => {
        console.log("login mounted");
      }

  render() {

    return (
      <Container style={{ minHeight: "80%" }}>
        <img className="logo-image" alt="" id="logo" src={require("./onDeckLogo.png")} />
          {/*<h1>{this.props.test}</h1>*/}
          <Row>
            <Col size="md-12">
                <Button className={this.state.signinClass} onClick={this.showLogin}>Sign In</Button>
                <Button className={this.state.signupClass} onClick={this.showSignup}>Sign Up</Button>
            </Col>
            <Col size="md-12">
                <Collapse isOpen={!this.state.collapse}>
                  <LoginForm {...this.props}/>
                </Collapse>

                <Collapse isOpen={this.state.collapse}>
                  <SignupForm {...this.props}/>
                </Collapse>
            </Col>
          </Row>
      </Container>
    );
  }
}

export default Login;