import { 
	MARK_ONBOARDING_COMPLETE
} from '../actions/types';

const INITIAL_STATE = {
	onboardingComplete: false
}

export default function(state=INITIAL_STATE, action){
	
	switch(action.type){
		case MARK_ONBOARDING_COMPLETE:
			return { ...state, onboardingComplete: true };
		default:
			return state;
	}
}