// @flow
/**
 * Name: servers Reducer
 * Type: Redux Reducer
 * Description:
 */
import type { Action } from '../../constants/ActionTypes';
import type { ServersState } from './state';

import initialState from './state';

export default function servers(
	state: ServersState = initialState,
	action: Action
): ServersState {
	switch (action.type) {
		case 'UPDATE_SERVER_DATA':
			return state.map(
				server => (server.id === action.payload.id ? { ...server, ...action.payload } : server)
			);
		default:
			return state;
	}
}
