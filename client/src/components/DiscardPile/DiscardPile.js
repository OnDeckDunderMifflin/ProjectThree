import React, {Component} from "react";
import "./DiscardPile.css"

class DiscardPile extends Component {

	render() {
    console.log("discard pile props", this.props);

    let fieldsOnCard = [];
    const info = Object.keys(this.props.topCard).filter(key => key.indexOf('fieldInfo') === 0);
    const bgCLR = {backgroundColor: this.props.topCard.bgColor}

    for(var k=0; k < info.length; k++){
      let field = this.props.topCard[info[k]]
      fieldsOnCard.push(<h5 key={k}>{field}</h5>);
    };

		return (
      this.props.shouldRender
      ?
			<div>
				<div className="discard-pile">
          <div onClick={this.handleClick} className={"in-play-card"} style={bgCLR}>{fieldsOnCard}</div>
				</div>
			</div>
      :
      null
		)
	}
}

export default DiscardPile;