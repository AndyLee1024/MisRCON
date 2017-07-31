// @flow
/**
 * Name: Servers Actions
 * Description:
 */
import * as misrcon from 'node-misrcon';

import type { ServerState } from './state';

import * as actionType from '../../constants/ActionTypes';
import * as notify from '../Notifications/actions';

type GetState = () => ServerState;
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

/**
 * Initial Date Getters
 */
export function fetchingServerData() {
	return {
		type: actionType.FETCHING_ALL_SERVER_DATA
	};
}

export function recievedServerData(data: any) {
	return {
		type: actionType.UPDATE_ALL_SERVER_DATA,
		payload: data
	};
}

export function getInitialData(): ThunkAction {
	return (dispatch, getState) => {
		dispatch(fetchingServerData());
		misrcon
			.getAllServerData(getState().credentials)
			.then(res => dispatch(recievedServerData(res)))
			.catch(e => {
				throw e;
			});
	};
}

/**
 * Status
 */
export function updateStatus(status) {
	return {
		type: actionType.UPDATE_SERVER_STATUS,
		payload: status
	};
}

export function fetchingStatus() {
	return {
		type: actionType.FETCHING_SERVER_STATUS
	};
}

export function getStatus(): ThunkAction {
	return (dispatch, getState) => {
		dispatch(fetchingStatus());
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: 'status'
			})
			.then((statusRes: string) =>
				dispatch(updateStatus(misrcon.parseStatusResponseToJs(statusRes)))
			)
			.catch(e => console.log(e));
	};
}

/**
 * Whitelist
 */
export function updateWhitelist(whitelist) {
	return {
		type: actionType.UPDATE_SERVER_WHITELIST,
		payload: whitelist
	};
}

export function fetchingWhitelist() {
	return {
		type: actionType.FETCHING_SERVER_WHITELIST
	};
}

export function getWhitelist(): ThunkAction {
	return (dispatch, getState) => {
		dispatch(fetchingWhitelist());
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: 'mis_whitelist_status'
			})
			.then((whitelistRes: string) =>
				dispatch(
					updateWhitelist(misrcon.parseWhitelistResponseToJs(whitelistRes))
				)
			)
			.catch(e => console.log(e));
	};
}

export function whitelistPlayer(steamid: string): ThunkAction {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: `mis_whitelist_add ${steamid}`
			})
			.then(() => dispatch(getWhitelist()))
			.catch(() => {});
	};
}

export function unWhitelistPlayer(steamid: string): ThunkAction {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: `mis_whitelist_remove ${steamid}`
			})
			.then(() => dispatch(getWhitelist()))
			.catch(() => {});
	};
}

/**
 * Bans
 */
export function updateBanList(banList: Array<string>) {
	return {
		type: actionType.UPDATE_SERVER_BANLIST,
		payload: banList
	};
}

export function fetchingBanList() {
	return {
		type: actionType.FETCHING_SERVER_BANLIST
	};
}

export function getBanList(): ThunkAction {
	return (dispatch, getState) => {
		dispatch(fetchingBanList());
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: 'mis_ban_status'
			})
			.then((banListRes: string) =>
				dispatch(updateBanList(misrcon.parseBanListResponseToJs(banListRes)))
			)
			.catch(() => {});
	};
}

export function banPlayer(steamid: string): ThunkAction {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: `mis_ban_steamid ${steamid}`
			})
			.then(() => dispatch(getBanList()))
			.catch(() => {});
	};
}

export function unBanPlayer(steamid: string): ThunkAction {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: `mis_ban_remove ${steamid}`
			})
			.then(() => dispatch(getBanList()))
			.catch(() => {});
	};
}

/**
 * Kicks
 */
export function kickPlayer(steamid: string): ThunkAction {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials,
				command: `mis_kick ${steamid}`
			})
			.then(() =>
				// add it to status
				dispatch(getStatus())
			)
			.catch(() => {});
	};
}

/**
 * RCON Actions
 */

// This thunk sends the command and adds the response to state
export function sendRCONCommandToServer(command: Array<string>): ThunkAction {
	return (dispatch, getState) => {
		dispatch(rconSetCommand(command.join(' ')));
		dispatch(rconPending());
		misrcon
			.sendRCONCommandToServer({ ...getState().credentials, command })
			.then(res => dispatch(rconRecieved(res)))
			.catch(e => dispatch(notify.emitError(e)));
	};
}

export function rconSetCommand(cmd: string) {
	return {
		type: actionType.SET_RCON_COMMAND,
		payload: cmd
	};
}

export function rconPending() {
	return {
		type: actionType.SEND_RCON_COMMAND_PENDING
	};
}

export function rconRecieved(data: any) {
	return {
		type: actionType.SEND_RCON_COMMAND_RECEIVED,
		payload: data
	};
}

/**
 * This is the default action for the console
 * if it doesn't recognize the command it will send it through to rcon
 */
export function commandPassThrough(
	cmd: Array<string>,
	print: any,
	runCommand: any
) {
	print('Sending...');
	const creds = {
		port: '64040',
		password: 'password',
		ip: '192.168.1.1',
		command: cmd.join(' ')
	};
	misrcon
		.sendRCONCommandToServer(creds)
		.then((res: string) => runCommand(`edit-line  ${res}`))
		.catch(err => runCommand(`edit-line ${err}`));
}
