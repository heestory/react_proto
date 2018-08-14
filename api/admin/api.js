import fetch from "isomorphic-fetch";
import serialize from "form-serialize";

export function getList(sort) {
    return fetch( "http://localhost:8087/system/api/b/v3_2/get_list?" + sort)
        .then( res => res.json() );
}

export function getRecord(id){
	return fetch( "http://localhost:8087/system/api/b/v3_2/get_record/" + id )
    	.then( res => res.json() );
}

export function save(fetchData) {
	let url = "http://localhost:8087/system/api/a/v3_2/";
	const obj = serialize(document.querySelector('#modalForm'), {hash: true, disabled: true});
	
	if(obj.id == 0){
		url += "insert";
	}else{
		url += "update";
	}
	
	return fetch( url, {
		method: "POST",
		headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
		body: JSON.stringify(obj)
	}).then( res => {
		fetchData("sort=id,desc");
		
		return res;
	} );
}

export function remove(id, fetchData) {
	return fetch( "http://localhost:8087/system/api/a/v3_2/delete/" + id, {method: "DELETE"})
	.then( res => { 
		fetchData("sort=id,desc");
		
		return res;
	} );
}