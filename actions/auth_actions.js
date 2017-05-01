import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';
import {
	MARK_ONBOARDING_COMPLETE
} from './types';


export const markOnboardingComplete = () => async dispatch => {
	let item = await AsyncStorage.setItem('onboardingComplete', 'true');
	dispatch({ type: MARK_ONBOARDING_COMPLETE });
};

