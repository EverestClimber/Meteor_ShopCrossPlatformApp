import { 
	TOGGLE_CATEGORY_TO_FILTER,
	CLEAR_SELECTED_CATEGORIES,
	TOGGLE_NEARME_FILTER,
	ADD_NEARME_LOCATION,
	SEARCH_TEXT
} from './types';

export const addCategoryToFilter = (category) => async dispatch => {
	dispatch({ 
		type: TOGGLE_CATEGORY_TO_FILTER,
		payload: category
	});
};

export const onSearchTextChange = (text) => async dispatch => {
	dispatch({ 
		type: SEARCH_TEXT,
		payload: text
	});
};

export const clearCategoriesFilter = () => async dispatch => {
	dispatch({ 
		type: CLEAR_SELECTED_CATEGORIES
	});
};

export const toggleNearMeToFilter = () => async dispatch => {
	dispatch({ 
		type: TOGGLE_NEARME_FILTER
	});
};

export const addNearMeLocation = (location) => async dispatch => {
	dispatch({ 
		type: ADD_NEARME_LOCATION,
		payload: location
	});
};


