import React, {Component} from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import axios from "axios";
import Game from "./pages/Game";
import Wrapper from "./components/Wrapper";
import DeckMake from "./pages/DeckMake";
import CardMake from "./pages/CardMake";
import BackOrGo from "./pages/BackOrGo";
import {findGame} from './firebase';


const universalProps = {
  findGame: findGame,
  user: null
}

class App extends Component {

  constructor(props){
    super(props);
    universalProps.user = this.props.user
    this.state = {
      auth: props.auth,
      propsToRenderedComponent: universalProps,
      componentToRender: Home,
      newDeck: {}
    };
  };

  renderNewComponent = (component, props) =>{
    let newState = this.state;
    newState.componentToRender = this.CompFrmStr(component);
    newState.propsToRenderedComponent = Object.assign(props, universalProps);

    if(document.cookie.indexOf("token") !== -1){
      axios.post('/auth/', {}).then(response => {
        if(response.data === "success"){
          newState.auth = response.data;
        }else{
          newState.auth = null;
        }
        this.setState(newState);
      })
    }else{
      newState.auth = null
      this.setState(newState)
    }
  };

  setUser = (username) => {
    universalProps.user = username;
  }

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
        <this.state.componentToRender {...this.state.propsToRenderedComponent} renderNewComponent={this.renderNewComponent} setUser={this.setUser}/>
      </Wrapper>
    : <Login {...this.state.propsToRenderedComponent} renderNewComponent={this.renderNewComponent} setUser={this.setUser}/>
    )
  };
};

export default App;