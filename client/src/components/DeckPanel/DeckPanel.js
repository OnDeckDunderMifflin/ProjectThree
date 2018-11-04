import React, { Component } from 'react';
import { Collapse, Button} from 'reactstrap';
import Row from "../Row";
import Col from "../Col";
import "./DeckPanel.css";
import GameForm from "../GameForm";

class ClassicDeck extends Component {
	constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
    	this.state = { collapse: false };
    }

  	toggle() {
    	this.setState({ collapse: !this.state.collapse });
  }

	render(){
		return(
			<Row>
				<Col size="md-12">
					<div>
						<Button className="deckExpand classicdeck" id={this.props.deckName} onClick={this.toggle}>{this.props.deckName}
					{/* <br/> <img className="classic-image" alt="" src={require("./classic.png")} /> */}
						</Button>
							<Collapse isOpen={this.state.collapse}>
								<GameForm {...this.props}/>
						</Collapse>
					</div>
				</Col>
			</Row>
		)
	}
};

export default ClassicDeck; 