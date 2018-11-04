import React from "react";
import "./LoginForm.css";
import axios from "axios";


class LoginForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
    }
  };

  handleInputChange = event => {

    const{name, value} = event.target;

    this.setState({[name]: value});
  };

  handleLogin = event => {
    event.preventDefault();

    let pass = this.state.password;
    let user = this.state.username;

    if(user === "" || pass === ""){
      console.log("username or password is blank");
      return;
    }

    axios.post("/auth/login",{username: user.toLowerCase(), password: pass})
    .then(response => {
      if(response.data.status === "success"){
        this.props.setUser(response.data.user)
        this.props.renderNewComponent("home", {})
      }else{
        console.log("incorrect usernamme or password")
      }
    })

    this.setState({username: "", password: "",})
  };

  render(){
    return(
  <form className="login">
    <div className="form-group">


      <input
        value={this.state.username}
        type="text"
        className="form-control"
        glyphicon="glyphicon glyphicon-user"
        placeholder="USERNAME"
        onChange={this.handleInputChange}
        name="username"
        id="username"
      />
      <input
        value={this.state.password}
        type="password"
        className="form-control"
        placeholder="PASSWORD"
        onChange={this.handleInputChange}
        name="password"
        id="password_login"
      />
      <button
        type="submit"
        onClick={this.handleLogin}
        className="btn" 
      >SIGN IN
      </button>
    </div>
  </form>
    )
  }
}
export default LoginForm;
