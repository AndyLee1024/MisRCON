// @flow
/**
 * Name: actions
 * Description:
 */
import store from 'store';

import * as actionType from '../../constants/ActionTypes';
import defaultState from './state';

export const saveLayoutState = () => {
	return {
		type: actionType.SAVE_LAYOUT_PROVIDER_STATE
	};
};

export const resetLayoutState = () => {
	return {
		type: actionType.RESET_LAYOUT_PROVIDER_STATE,
		payload: defaultState
	};
};

export const restoreLayoutState = () => {
	store.set('test', { val: 'any value' });
	return {
		type: actionType.RESTORE_LAYOUT_PROVIDER_STATE,
		payload: defaultState
	};
};
