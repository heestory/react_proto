import React, { Component } from "react";
import Row from "./Row";

class List extends Component {
	render(){
		return (
			<table border="1">
				<thead>
					<tr>
						<th>아이디</th>
						<th>영문명</th>
						<th>한글명</th>
					</tr>
				</thead>
				<tbody>
				{ this.props.apis.map( row => (
					<Row row={row} key={row.id}/>
				) ) }
				</tbody>
			</table>
		);
	}
}

export default List;