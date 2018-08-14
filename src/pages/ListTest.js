import React from "react";
import { connect } from "react-redux";
import { fetchListData, modalAction } from "../store";
import List from "../components/List";
import Modal from "../components/Modal";

class ListTest extends React.Component {
	constructor() {
        super();
        this.openModal = this.openModal.bind(this);
    }
	
	componentDidMount() {
 		if ( this.props.apis.length <= 0 ) {
            this.props.fetchListData("sort=id,desc");
        }
    }
	
    render( ) {
        const { apis } = this.props;

        return (
            <div>
                <h2>System apis</h2>
                <button onClick={this.openModal}>등록</button>
                <ul>
                	<List apis={apis} /> 
                </ul>
                <Modal fetchListData={this.props.fetchListData} />
            </div>
        );
    }
    
    openModal() {
        this.props.modalAction(true)
    }
}

const mapStateToProps = ( state ) => {
	return state.data.list;
};

const mapDispatchToProps = {
	fetchListData,
    modalAction
};

export default connect( mapStateToProps, mapDispatchToProps )( ListTest );
