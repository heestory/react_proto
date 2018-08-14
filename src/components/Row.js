import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchData } from "../store";

class Row extends Component {
	constructor(){
		super();
		this.openModal = this.openModal.bind(this);
	}
	
	render() {
		const { row } = this.props;
		
		return (
			<tr onClick={this.openModal} key={row.id}>
				<td>{row.id}</td>	
				<td>{row.name}</td>
				<td>{row.label}</td>
			</tr>
		);
	}
	
	openModal() {
		this.props.fetchData(this.props.row.id);
	}
}

const mapDispatchToProps = {
		fetchData
};

export default connect( undefined, mapDispatchToProps )( Row );