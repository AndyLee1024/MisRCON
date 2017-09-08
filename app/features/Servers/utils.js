// @flow
/**
 * Name: Servers Utils
 * Description: Functions to get, modify or work with data from the Servers state
 */
import store from 'store';
import type {
  AllData,
  StatusResponse
} from 'node-misrcon';

import type { AppState } from '../../constants/ActionTypes';
import type {
  Credentials,
  ServersState,
  ServerState
} from './state';

import { normalizePlayersArray } from '../Players/utils';

/**
 * Given the app state go and get the credentials for a server based on a serverId
 */
export const getCredentialsFromAppStateById = (
  state: AppState,
  serverId: number
): Credentials =>
  state.servers.filter(server => server.id === serverId)[0].credentials;

/**
 * Given the ServersState go and get the active ServerState
 */
export const getActiveServer = (servers: ServersState): ServerState =>
  servers.filter(server => server.active === true)[0];

/**
 * Takes a StatusResponse from node-misrcon and converts it into a StatusState
 */
export const normalizeStatus = (status: StatusResponse): any => {
  return {
    ...status,
    playersArray: normalizePlayersArray(status.playersArray)
  };
};

/**
 * normalize the allData response from node-misrcon and convert it into our internal StatusResponse
 */
export const normalizeAllData = (allData: AllData): any => ({
  ...allData,
  // remove the duplicate values if any from whitelist and banlist
  whitelist: [...new Set(allData.whitelist)],
  banlist: [...new Set(allData.banlist)],
  status: normalizeStatus(allData.status)
});

export const storeAndReturn = (key: string, value: any) => {
  store.set(key, value);
  return value;
};
