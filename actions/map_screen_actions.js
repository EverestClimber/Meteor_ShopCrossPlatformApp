import { 
	ON_CURRENT_SHOP_CHANGE,
} from './types';



export const onCurrentShopChange = (shopId) => async dispatch => {
	dispatch({ 
		type: ON_CURRENT_SHOP_CHANGE,
		payload: shopId
	});
};

