import React, {Component} from "react";
import "./PlayingCards.css";

class PlayingCards extends Component { 

  handleClick = event => {
    const index = event.target.dataset.index;
    this.props.activate(index);
  }	

	render() {

    let cardsInHand = [];

    //iterate over the cards array only if it's length is greater than 1. firebase doesn't  
    //let us store empty arrays, so the cards array always has a dummy element at index 0
    for(var i=1; i < this.props.hand.length; i++){
      let fieldsOnCard = [];
      let info = Object.keys(this.props.hand[i]).filter(key => key.indexOf('fieldInfo') === 0);
      let bgCLR = {
        backgroundColor: this.props.hand[i].bgColor
      }
      const cardClass = this.props.activeIndexes.indexOf(i.toString()) === -1 ? "playing-card" : "playing-card active";

      for(var k=0; k < info.length; k++){
        let field = this.props.hand[i][info[k]]
        fieldsOnCard.push(<h5 key={k}>{field}</h5>);
      };

      cardsInHand.push(<div key={i} data-index={i} onClick={this.handleClick} className={cardClass} style={bgCLR}>{fieldsOnCard}</div>);
    };

		return (
			<div>
				<div className="playing-cards">
					<div className="outer-div">
            {cardsInHand}
          </div>
				</div>
			</div>
		);
	};
};

export default PlayingCards;
