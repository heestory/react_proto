import React, {Component} from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import Text from "./Text";
import Button from "./Button";

import { modalAction, fetchDataSave, fetchRemoveData } from "../store";

class Modal extends Component {
	constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.saveForm = this.saveForm.bind(this);
        this.removeData = this.removeData.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
	
	render( ) {
		return(
			<div>
				<ReactModal isOpen={this.props.modalState} contentLabel={"test"} ariaHideApp={false}>
					<form id="modalForm" onSubmit={this.submit}>
						{function(){
							if(Object.keys(this.props.modalData).length){
								return (<Button label={"삭제"} fnc={this.removeData} />);
							}
						}.call(this)}
						<Text label={"아이디"} name={"id"} data={this.props.modalData.id} disabled={true} />
						<Text label={"영문명"} name={"name"} data={this.props.modalData.name} />
						<Text label={"한글명"} name={"label"} data={this.props.modalData.label} />
						<Text label={"LIST API"} name={"list"} data={this.props.modalData.list} />
						<Text label={"SELECT API"} name={"select"} data={this.props.modalData.select} />
						<Text label={"INSERT API"} name={"insert"} data={this.props.modalData.insert} />
						<Text label={"UPDATE API"} name={"update"} data={this.props.modalData.update} />
						<Text label={"DELETE API"} name={"delete"} data={this.props.modalData.delete} />
						<Text label={"API 타입"} name={"type"} data={this.props.modalData.type} />
					</form>
					<Button label={"저장"} fnc={this.saveForm} />
					<Button label={"닫기"} fnc={this.closeModal} />
				</ReactModal>
			</div>
		);
	}
	
	submit(e) {
		e.preventDefault();
	}
	
	removeData() {
		this.props.fetchRemoveData(this.props.modalData.id, this.props.fetchListData);
	}
	
	saveForm() {
		this.props.fetchDataSave(this.props.fetchListData);
	}
	
	closeModal() {
		this.props.modalAction(false);
    }
}

const mapStateToProps = ( state ) => {
	return state.data.modal;
};

const mapDispatchToProps = {
		modalAction,
		fetchDataSave,
		fetchRemoveData
};

export default connect( mapStateToProps, mapDispatchToProps )( Modal );