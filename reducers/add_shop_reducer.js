import { 
	ON_TITLE_CHANGE
} from '../actions/types';



const INITIAL_STATE = {
	title: null,
}

export default function(state=INITIAL_STATE, action){
	
	switch(action.type){
		case ON_TITLE_CHANGE:
	      	return {...state, title: action.payload };
		default:
			return state;
	}
}

