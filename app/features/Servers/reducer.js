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
				server =>
					server.id === action.payload.id
						? { ...server, ...action.payload }
						: server
			);

		case 'SEND_RCON_COMMAND_PENDING':
			return state;

		case 'FETCHING_SERVER_DATA':
			return state;

		default:
			return state;
	}
}
