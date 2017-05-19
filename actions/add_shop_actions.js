import { 
	ON_TITLE_CHANGE
} from './types';

export const onTitleChange = (title) => async dispatch => {
	dispatch({ 
		type: ON_TITLE_CHANGE,
		payload: title
	});
};



