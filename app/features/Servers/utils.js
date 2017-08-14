/**
 * Name: Servers Utils
 * Description: Functions to get, modify or work with data from the Servers state
 */

import type { AppState } from '../../constants/ActionTypes';
import type { Credentials } from './state';
/**
 * Given the app state go and get the credentials for a server based on a serverId
 */
export function getCredentialsFromAppStateById(
	state: AppState,
	serverId: number
): Credentials {
	return state.servers.filter(server => server.id === serverId)[0].credentials;
}
