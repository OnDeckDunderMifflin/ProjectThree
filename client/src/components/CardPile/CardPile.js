import React, {Component} from "react";
import "./CardPile.css";
import Popup from "../Popup";

class CardPile extends Component {

	constructor(props){
		super(props);
    this.togglePopup = this.togglePopup.bind(this);
		this.state = {
      cards: props.cardPile,
      showPopup: false
    }
  }
  
  handleClick = () => {
    if(!this.props.canDeal){return};
    let deal = prompt("How many cards would you like to deal?")
    let num
  	if (deal === null || deal === "") {
        num = 0;
    } else {
        num = deal;
    }
    this.props.deal(num);
  }

  togglePopup() {
    if(!this.props.canDeal || !this.props.isActive){return};
    this.setState({
      showPopup: !this.state.showPopup
    });
  }

	render() {
		return (
      this.props.shouldRender
      ?
			<div>
				<div className="card-pile" onClick={this.togglePopup}>
					{/*<h5>{this.state.cards.cardPile.length}</h5>*/}
				</div>
        {this.state.showPopup ? 
          <Popup deal={this.props.deal} togglePopup={this.togglePopup}/>
          : null
        }
			</div>
      :
      null
		)
	}
}

export default CardPile;