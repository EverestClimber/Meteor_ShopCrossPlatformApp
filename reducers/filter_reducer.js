import { 
	TOGGLE_CATEGORY_TO_FILTER,
	CLEAR_SELECTED_CATEGORIES,
	TOGGLE_NEARME_FILTER,
	ADD_NEARME_LOCATION,
	SEARCH_TEXT
} from '../actions/types';
import _ from 'lodash';


// REDUCER HELPERS
// =======================================================
const getNewCategorySelections = (state, action) => {
	
	// if elements exists in array, remove the action.payload value
	if (state.selectedCategories.includes(action.payload)) {
		return state.selectedCategories.filter(element => element !== action.payload)
	} 
	// if element does not exists, return a new array that includes the action.payload value
	else {
		return state.selectedCategories.concat(action.payload)
	}

}



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
	    	if (state.nearMe) {
	    		return {...state, nearMe: false,  nearMeLocation: null};
	    	} else {
	    		return {...state, nearMe: true };
	    	}
	    case ADD_NEARME_LOCATION:
	    	let newLocation = action.payload;
	      	return {...state, nearMeLocation: newLocation };
	    case TOGGLE_CATEGORY_TO_FILTER:
	    	let newSelectedCategories = getNewCategorySelections(state, action); 
	    	return { 
		        ...state,
		        selectedCategories: newSelectedCategories
		    }
		default:
			return state;
	}
}

