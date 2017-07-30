/**
 * Name: layoutProvider
 * Type: Redux Reducer
 * Description:
 */
import * as actionTypes from '../../constants/ActionTypes';
import defaultState from './state';

export default function layoutProvider(state = defaultState, action) {
	switch (action.type) {
		case actionTypes.SAVE_LAYOUT_PROVIDER_STATE:
			return state;
		case actionTypes.RESET_LAYOUT_PROVIDER_STATE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
}
