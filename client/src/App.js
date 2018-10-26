import React, {Component} from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Wrapper from "./components/Wrapper";
import DeckMake from "./pages/DeckMake";
import CardMake from "./pages/CardMake";
import BackOrGo from "./pages/BackOrGo";
import firebase, {login, logout, findGame}from './firebase';

console.log(Home)

const universalProps = {
  test: "hello",
  login: login,
  logout: logout,
  findGame: findGame
}

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      propsToRenderedComponent: universalProps,
      auth: props.auth,
      componentToRender: Home,
      newDeck: {}
    };
  };

  //------pretty sure this method is unused, will delete once I'm sure.   -Sam------
  //===========================================================================================================
  // addNewDeck = (data) => {
  //   console.log("if the data is coming in from the DeckMake, it should show below this line:");
  //   console.log(data);
  //   this.setState({newDeck: data});
  //   console.log("if the data is coming in from this(dot)state(dot)newdeck, it should show below this line:");
  //   console.log(this.state);
  // }
  //============================================================================================================

  renderNewComponent = (component, props) =>{

    let newState = this.state;
    newState.componentToRender = this.CompFrmStr(component);
    newState.propsToRenderedComponent = Object.assign(props, universalProps);
    newState.auth = firebase.auth().currentUser

    this.setState(newState);
  };

  CompFrmStr = compName => {
    let component;
    switch(compName.toLowerCase()){
      case "login":
        component = Login;
        break

      case "home":
        component = Home;
        break

      case "deckmake":
        component = DeckMake;
        break

      case "cardmake":
        component = CardMake;
        break

      case "game":
        component = Game;
        break

      case "backorgo":
        component = BackOrGo;
        break

      default:
        component = Home;
    };
    return component
  };

  render(){
    return(
    this.state.auth
    ? <Wrapper>
        <this.state.componentToRender {...this.state.propsToRenderedComponent} renderNewComponent={this.renderNewComponent} user={this.state.auth}/>
      </Wrapper>
    : <Login {...this.state.propsToRenderedComponent} renderNewComponent={this.renderNewComponent}/>
    )
  };
};


export default App;