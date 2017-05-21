import { 
	ON_CURRENT_SHOP_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
	currentShopId: null
}

export default function(state=INITIAL_STATE, action){
	
	switch(action.type){
		case ON_CURRENT_SHOP_CHANGE:
			return { ...state, currentShopId: action.payload };
		default:
			return state;
	}
}