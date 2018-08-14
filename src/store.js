import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { getList, getRecord, save, remove } from "../api/admin/api";

const initialState = {
	list: {
		apis: [],
		info: {},
		status: "",
	},
	modal: {
		modalData: {},
		modalState: false
	}
	
}

const storeData = ( data ) => ( {
    type: "STORE_DATA",
    data
} );

const modalData = ( data ) => ( {
	type: "MODAL_DATA",
	data
} );

const modalPost = ( data ) => ( {
	type: "MODAL_POST",
	data
} );

const removeData = ( data ) => ( {
	type: "REMOVE_DATA",
	data
} );

export const fetchListData = (sort) => ( dispatch ) =>
	getList(sort).then( res => dispatch( storeData( res ) ) );

export const fetchData = (id) => ( dispatch ) => 
	getRecord(id).then( res => dispatch( modalData( { modalData: res.data, modalState: true } ) ) );
	
export const fetchDataSave = (fetchData) => ( dispatch ) => 
	save(fetchData).then( res => dispatch( modalPost( res ) ) );
	
export const fetchRemoveData = (id, fetchData) => ( dispatch ) => 
	remove(id, fetchData).then( res => dispatch( removeData(res) ) );
	
export const modalAction = (modalState) => (dispatch) =>
	dispatch( modalData ( { modalData: { }, modalState: modalState } ) );

const dataReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case "STORE_DATA":
            return Object.assign({}, state, {
            	list:{
	            	apis: action.data.data.list,
	            	info: action.data.info,
	            	status: action.data.status
            	}
            });
        case "MODAL_DATA":
        	return Object.assign({}, state, {
        		modal:{
        			modalData: action.data.modalData,
            		modalState: action.data.modalState	
        		}
        	});
        case "MODAL_POST":
        case "REMOVE_DATA":
        	return Object.assign({}, state, {
        		modal:{
        			modalData: {},
            		modalState: false	
        		}
        	});
        default: return state;
    }
};

const reducer = combineReducers( {
    data: dataReducer
} );

export default ( initialState ) =>
    createStore( reducer, initialState, applyMiddleware( thunkMiddleware ) );
