// @flow
/**
 * Name: Servers Utils
 * Description: Functions to get, modify or work with data from the Servers state
 */

import type { AppState } from '../../constants/ActionTypes';
import type { Credentials, ServersState, ServerState } from './state';


/**
 * Given the app state go and get the credentials for a server based on a serverId
 */
export function getCredentialsFromAppStateById(
	state: AppState,
	serverId: number
): Credentials {
	return state.servers.filter(server => server.id === serverId)[0].credentials;
}

/**
 * Given the ServersState go and get the active ServerState
 */
export function getActiveServer(servers: ServersState): ServerState {
	return servers.filter(server => server.active === true)[0];
}
