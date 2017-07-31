// @flow
/**
 * Name: servers Reducer
 * Type: Redux Reducer
 * Description:
 */
import type { ServersState } from './state';
import initialState from './state';

export default function servers(
	state: ServersState = initialState,
	action: any
) {
	switch (action.type) {
		default:
			return state;
	}
}
