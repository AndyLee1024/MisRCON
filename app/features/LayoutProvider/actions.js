// @flow
/**
 * Name: actions
 * Description:
 */
import store from 'store';

import type { GoldenLayout } from 'golden-layout';
import type { Action } from '../../constants/ActionTypes';

import * as actionType from '../../constants/ActionTypes';
import { defaultConfig } from './state';

export const saveLayoutState = (layout: GoldenLayout): Action => {
	store.set('layoutProviderConfig', layout.toConfig());
	return {
		type: actionType.SAVE_LAYOUT_PROVIDER_STATE
	};
};

export const resetLayoutState = (): Action => {
	return {
		type: actionType.RESET_LAYOUT_PROVIDER_STATE,
		payload: defaultConfig
	};
};
