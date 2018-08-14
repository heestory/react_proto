import React, {Component} from "react";

class Text extends Component {
	render( ) {
		return(
			<div>
				<label>{this.props.label}</label>
				<input type="text" name={this.props.name} defaultValue={this.props.data} disabled={this.props.disabled}/>
			</div>
		);
	}
}

export default Text;