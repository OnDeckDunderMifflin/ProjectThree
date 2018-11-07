import React from "react";
import "./SignupForm.css";
import axios from "axios";


class SignupForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: "",
      username: "",
      password: ""
    };
  };

  handleInputChange = event => {
    const{name, value} = event.target

    this.setState({[name]: value});
  };

  handleSignUp = event => {
    event.preventDefault();
    let username = this.state.username.trim();
    let password = this.state.password.trim();

    if(username.length < 1) {
      //username too short code goes here
      console.log("username can't be blank")
    }else if(password.length < 6){
      //password too short code goes here
      console.log("password must be at least 6 characters");
    }else{
      axios.post("/auth/signup", {
        username: username,
        password: password
      }).then(response =>{
        if(response.data.status === "failed"){
          console.log(response.data);
        }else{
          this.props.setUser(response.data.user);
          this.props.renderNewComponent('home', {});
        }
      })

    };
  };

  render(){
    return(
    <form className="login">
      <div className="form-group">
        <input
          value={this.state.username}
          type="text"
          className="form-control"
          placeholder="USERNAME"
          onChange={this.handleInputChange}
          name="username"
          id="username_input"
        />
      <input
          value={this.state.password}
          type="password"
          className="form-control"
          placeholder="PASSWORD"
          onChange={this.handleInputChange}
          name="password"
          id="password_input"
        />
        <button
          type="submit"
          onClick={this.handleSignUp}
          className="btn" 
        >SIGN UP
        </button>
      </div>
    </form>
    )
  };
};
export default SignupForm;
