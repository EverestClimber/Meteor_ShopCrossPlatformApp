import { 
	ADD_CATEGORY_TO_FILTER,
	CLEAR_SELECTED_CATEGORIES,
	TOGGLE_NEARME_FILTER
} from './types';

export const addCategoryToFilter = (category) => async dispatch => {
	dispatch({ 
		type: ADD_CATEGORY_TO_FILTER,
		payload: category
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


