// @flow
/**
 * Name: actions
 * Description:
 */
import * as actionType from '../../constants/ActionTypes';
import type { Action } from '../../constants/ActionTypes';
import defaultState from './state';

export const saveLayoutState = (): Action => {
	return {
		type: actionType.SAVE_LAYOUT_PROVIDER_STATE
	};
};

export const resetLayoutState = (): Action => {
	return {
		type: actionType.RESET_LAYOUT_PROVIDER_STATE,
		payload: defaultState
	};
};

export const restoreLayoutState = (): Action => {
	return {
		type: actionType.RESTORE_LAYOUT_PROVIDER_STATE,
		payload: defaultState
	};
};
