import { 
	ADD_CATEGORY_TO_FILTER,
	CLEAR_SELECTED_CATEGORIES,
	TOGGLE_NEARME_FILTER,
	ADD_NEARME_LOCATION,
	SEARCH_TEXT
} from '../actions/types';
import _ from 'lodash';


const INITIAL_STATE = {
	selectedCategories: [],
	nearMe: false,
	nearMeLocation: null,
	searchText: null
}

export default function(state=INITIAL_STATE, action){
	
	switch(action.type){
		case SEARCH_TEXT:
	      	return {...state, searchText: action.payload };
		case CLEAR_SELECTED_CATEGORIES:
	      	return {...state, selectedCategories: [] };
	    case TOGGLE_NEARME_FILTER:
	    	let newState = !state.nearMe
	      	return {...state, nearMe: newState };
	    case ADD_NEARME_LOCATION:
	    	let newLocation = action.payload;
	      	return {...state, nearMeLocation: newLocation };
	    case ADD_CATEGORY_TO_FILTER:
	    	return { 
		        ...state,
		        selectedCategories: state.selectedCategories.concat(action.payload)
		    }
		default:
			return state;
	}
}

