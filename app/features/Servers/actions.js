// @flow
/**
 * Name: Servers Actions
 * Description:
 */
import misrcon from 'node-misrcon';
import type {
	StatusResponse,
	BanListResponse,
	WhiteListResponse
} from 'node-misrcon';

import { getActiveServer, tryParse } from './utils';

// Types
import type {
	ServersActions,
	ThunkAction,
	Dispatch,
	GetState
} from '../../constants/ActionTypes';
import type { ServerState } from './state';
import type { PrintFunction } from '../LayoutProvider/widgets/ConsoleWidget/types';

/**
 * Initial Date Getters
 */
export function fetchingServerData(): ServersActions {
	return {
		type: 'FETCHING_SERVER_DATA'
	};
}

export function recievedServerData(data: ServerState): ServersActions {
	return {
		type: 'UPDATE_SERVER_DATA',
		payload: data
	};
}

export function getInitialData(): ThunkAction {
	return (dispatch: Dispatch, getState: GetState) => {
		dispatch(fetchingServerData());
		const activeServer = getActiveServer(getState().servers);
		misrcon
			.getAllServerData(activeServer.credentials)
			.then(serverStatus => {
				dispatch(
					recievedServerData({
						...activeServer,
						...serverStatus
					})
				);
			})
			.catch(e => {
				throw e;
			});
	};
}

export function rconPending(): ServersActions {
	return {
		type: 'SEND_RCON_COMMAND_PENDING'
	};
}

// This thunk sends a console command to the server
export function sendConsoleCommandToServer(
	command: Array<string>,
	print: PrintFunction
): ThunkAction {
	return (dispatch: Dispatch, getState: GetState) => {
		dispatch(rconPending());
		misrcon
			.sendRCONCommandToServer({
				...getActiveServer(getState().servers).credentials,
				command: command.join(' ')
			})
			.then(res => {
				// print the response to the ConsoleWidget
				print(res);

				// try to parse the response
				const data = tryParse(res);
				if (data) {
					// add the parsed response to state
					dispatch(recievedServerData(data));
				}

			})
			.catch(e => {
				throw e;
			});
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
// export function getStatus(): ThunkAction {
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
// export function getWhitelist(): ThunkAction {
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
// export function whitelistPlayer(steamid: string): ThunkAction {
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
// export function unWhitelistPlayer(steamid: string): ThunkAction {
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
// export function getBanList(): ThunkAction {
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
// export function banPlayer(steamid: string): ThunkAction {
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
// export function unBanPlayer(steamid: string): ThunkAction {
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
// export function kickPlayer(steamid: string): ThunkAction {
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
