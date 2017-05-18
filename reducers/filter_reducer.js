import { 
	ADD_CATEGORY_TO_FILTER,
	CLEAR_SELECTED_CATEGORIES,
	TOGGLE_NEARME_FILTER
} from '../actions/types';
import _ from 'lodash';


const INITIAL_STATE = {
	selectedCategories: [],
	nearMe: false
}

export default function(state=INITIAL_STATE, action){
	
	switch(action.type){
		case CLEAR_SELECTED_CATEGORIES:
	      return {...state, selectedCategories: [] };
	    case TOGGLE_NEARME_FILTER:
	    	let newState = !state.nearMe
	      return {...state, nearMe: newState };
	    case ADD_CATEGORY_TO_FILTER:
	    	return { 
		        ...state,
		        selectedCategories: state.selectedCategories.concat(action.payload)
		    }
		default:
			return state;
	}
}

