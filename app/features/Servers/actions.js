// @flow
/**
 * Name: Servers Redux Actions
 */
import misrcon from 'node-misrcon';
import type { ReduxThunk } from 'redux-thunk';
import type { Action, Dispatch, GetState } from '../../constants/ActionTypes';
import type { ServerState } from './state';
import type { PrintToConsoleFunction } from '../LayoutProvider/widgets/ConsoleWidget/types';
import { getActiveServer, normalizeAllData, normalizeStatus } from './utils';

/**
 * Called after we've received and parsed server data
 * and want to add it to state
 */
export function updateServerData(data: ServerState): Action {
  return {
    type: 'UPDATE_SERVER_DATA',
    payload: data
  };
}

/**
 * Indicates that the server is performing an RCON action
 */
export function rconPending(): Action {
  return {
    type: 'SEND_RCON_COMMAND_PENDING'
  };
}

/**
 * Makes a Server active by the id
 */
export function makeServerActive(id: number): Action {
  return {
    type: 'MAKE_SERVER_ACTIVE',
    id
  };
}

/**
 * Switches to a server by id
 */
export function switchToServer(id: number) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(makeServerActive(id));
    dispatch(fetchActiveServerData());
  };
}

/**
 * Gets all the data for the active server
 */
export function fetchActiveServerData(): ReduxThunk {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(rconPending());
    const activeServer = getActiveServer(getState().servers);
    const allData = await misrcon.getAllServerData(activeServer.credentials);
    const serverData = { ...activeServer, ...normalizeAllData(allData) };
    dispatch(updateServerData(serverData));
  };
}

/**
 * Sends a command to a server via the ConsoleWidget
 */
export function sendConsoleCommandToServer(
  command: Array<string>,
  printToConsole: PrintToConsoleFunction
) {
  return async (dispatch: Dispatch, getState: GetState) => {
    const activeServer = getActiveServer(getState().servers);
    dispatch(rconPending());
    const response = await misrcon.sendRCONCommandToServer({
      ...activeServer.credentials,
      command: command.join(' ')
    });
    printToConsole(response);
    dispatch(tryParseAndAddToState(response));
  };
}

/**
 * Given some random server response try and do something with it.
 */
export function tryParseAndAddToState(response: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    const activeServer = getActiveServer(getState().servers);
    const parsed = misrcon.tryParseResponse(response);
    if (parsed) {
      switch (parsed.type) {
        case 'whitelist':
          dispatch(
            updateServerData({ ...activeServer, whitelist: parsed.data })
          );
          break;
        case 'status':
          dispatch(
            updateServerData({
              ...activeServer,
              status: normalizeStatus(parsed.data)
            })
          );
          break;
        case 'banlist':
          dispatch(updateServerData({ ...activeServer, banlist: parsed.data }));
          break;
        default:
          break;
      }
    }
  };
}

/**
 * Given a task send it to the server and do something with the response
 */
export function sendTaskCommandToServer(response: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    // send command to server from task
  };
}

// /**
//  * Status
//  */
// export function updateStatus(status: StatusResponse): Action {
// 	return {
// 		type: 'UPDATE_SERVER_STATUS',
// 		payload: status
// 	};
// }
//
// export function fetchingStatus(): Action {
// 	return {
// 		type: 'FETCHING_SERVER_STATUS'
// 	};
// }
//
// export function getStatus() {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		dispatch(fetchingStatus());
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: 'status'
// 			})
// 			.then((statusRes: string) =>
// 				dispatch(updateStatus(misrcon.parseStatusResponseToJs(statusRes)))
// 			)
// 			.catch(e => console.log(e));
// 	};
// }
//
// /**
//  * Whitelist
//  */
// export function updateWhitelist(whitelist: WhiteListResponse) {
// 	return {
// 		type: 'UPDATE_SERVER_WHITELIST',
// 		payload: whitelist
// 	};
// }
//
// export function fetchingWhitelist(): Action {
// 	return {
// 		type: 'FETCHING_SERVER_WHITELIST'
// 	};
// }
//
// export function getWhitelist() {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		dispatch(fetchingWhitelist());
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: 'mis_whitelist_status'
// 			})
// 			.then((whitelistRes: string) =>
// 				dispatch(
// 					updateWhitelist(misrcon.parseWhitelistResponseToJs(whitelistRes))
// 				)
// 			)
// 			.catch(e => console.log(e));
// 	};
// }
//
// export function whitelistPlayer(steamid: string) {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: `mis_whitelist_add ${steamid}`
// 			})
// 			.then(() => dispatch(getWhitelist()))
// 			.catch(() => {});
// 	};
// }
//
// export function unWhitelistPlayer(steamid: string) {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: `mis_whitelist_remove ${steamid}`
// 			})
// 			.then(() => dispatch(getWhitelist()))
// 			.catch(() => {});
// 	};
// }
//
// /**
//  * Bans
//  */
// export function updateBanList(banList: BanListResponse): Action {
// 	return {
// 		type: 'UPDATE_SERVER_BANLIST',
// 		payload: banList
// 	};
// }
//
// export function fetchingBanList(): Action {
// 	return {
// 		type: 'FETCHING_SERVER_BANLIST'
// 	};
// }
//
// export function getBanList() {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		dispatch(fetchingBanList());
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: 'mis_ban_status'
// 			})
// 			.then((banListRes: string) =>
// 				dispatch(updateBanList(misrcon.parseBanListResponseToJs(banListRes)))
// 			)
// 			.catch(() => {});
// 	};
// }
//
// export function banPlayer(steamid: string) {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: `mis_ban_steamid ${steamid}`
// 			})
// 			.then(() => dispatch(getBanList()))
// 			.catch(() => {});
// 	};
// }
//
// export function unBanPlayer(steamid: string) {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: `mis_ban_remove ${steamid}`
// 			})
// 			.then(() => dispatch(getBanList()))
// 			.catch(() => {});
// 	};
// }
//
// /**
//  * Kicks
//  */
// export function kickPlayer(steamid: string) {
// 	return (dispatch: Dispatch, getState: GetState) => {
// 		misrcon
// 			.sendRCONCommandToServer({
// 				...getState(),
// 				command: `mis_kick ${steamid}`
// 			})
// 			.then(() =>
// 				// add it to status
// 				dispatch(getStatus())
// 			)
// 			.catch(() => {});
// 	};
// }
//
// /**
//  * RCON Actions
//  */
//

//
// export function rconSetCommand(cmd: string): Action {
// 	return {
// 		type: 'SET_RCON_COMMAND',
// 		payload: cmd
// 	};
// }
//

//
// export function rconRecieved(data: any): Action {
// 	return {
// 		type: 'SEND_RCON_COMMAND_RECEIVED',
// 		payload: data
// 	};
// }
//
// /**
//  * This is the default action for the console
//  * if it doesn't recognize the command it will send it through to rcon
//  */
// export function commandPassThrough(
// 	cmd: Array<string>,
// 	print: any,
// 	runCommand: any
// ) {
// 	print('Sending...');
// 	const creds = {
// 		port: '64040',
// 		password: 'password',
// 		ip: '192.168.1.1',
// 		command: cmd.join(' ')
// 	};
// 	misrcon
// 		.sendRCONCommandToServer(creds)
// 		.then((res: string) => runCommand(`edit-line  ${res}`))
// 		.catch(err => runCommand(`edit-line ${err}`));
// }
