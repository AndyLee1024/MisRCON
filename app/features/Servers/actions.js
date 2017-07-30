// @flow
/**
 * Name: Servers Actions
 * Description:
 */
import * as misrcon from 'node-misrcon';

import * as actionType from '../../constants/ActionTypes';
import * as notify from '../Notifications/actions';

// // // // // // // // //
// initialData Getter
// // // // // // // // //
export function fetchingServerData() {
	return {
		type: actionType.FETCHING_ALL_SERVER_DATA
	};
}
export function recievedServerData(data) {
	return {
		type: actionType.UPDATE_ALL_SERVER_DATA,
		payload: data
	};
}
export function getInitialData() {
	return (dispatch, getState) => {
		dispatch(fetchingServerData());
		misrcon
			.getAllServerData({ ...getState().credentials.active })
			.then(res => {
				dispatch(recievedServerData(res));
				return null;
			})
			.catch(e => {
				throw e;
			});
	};
}

// // // // // // // // //
// Status
// // // // // // // // //
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
export function getStatus() {
	return (dispatch, getState) => {
		dispatch(fetchingStatus());
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: 'status'
			})
			.then(statusResponseString => {
				dispatch(
					updateStatus(misrcon.parseStatusResponseToJs(statusResponseString))
				);
				return null;
			})
			.catch(() => {});
	};
}

// // // // // // // // //
// Whitelist
// // // // // // // // //
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
export function getWhitelist() {
	return (dispatch, getState) => {
		dispatch(fetchingWhitelist());
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: 'mis_whitelist_status'
			})
			.then(whitelistResponseString => {
				dispatch(
					updateWhitelist(
						misrcon.parseWhitelistResponseToJs(whitelistResponseString)
					)
				);
				return null;
			})
			.catch(() => {});
	};
}
export function whitelistPlayer(steamid) {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: `mis_whitelist_add ${steamid}`
			})
			.then(() => {
				dispatch(getWhitelist());
				return null;
			})
			.catch(() => {});
	};
}
export function unWhitelistPlayer(steamid) {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: `mis_whitelist_remove ${steamid}`
			})
			.then(() => {
				dispatch(getWhitelist());
				return null;
			})
			.catch(() => {});
	};
}

// // // // // // // // //
// Ban
// // // // // // // // //
export function updateBanList(banList) {
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
export function getBanList() {
	return (dispatch, getState) => {
		dispatch(fetchingBanList());
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: 'mis_ban_status'
			})
			.then(banListResponseString => {
				dispatch(
					updateBanList(misrcon.parseBanListResponseToJs(banListResponseString))
				);
				return null;
			})
			.catch(() => {});
	};
}
export function banPlayer(steamid: string) {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: `mis_ban_steamid ${steamid}`
			})
			.then(() => {
				dispatch(getBanList());
				return null;
			})
			.catch(() => {});
	};
}
export function unBanPlayer(steamid: string) {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: `mis_ban_remove ${steamid}`
			})
			.then(() => {
				dispatch(getBanList());
				return null;
			})
			.catch(() => {});
	};
}

// // // // // // // // //
// Kick
// // // // // // // // //
export function kickPlayer(steamid: string) {
	return (dispatch, getState) => {
		misrcon
			.sendRCONCommandToServer({
				...getState().credentials.active,
				command: `mis_kick ${steamid}`
			})
			.then(() => {
				// add it to status
				dispatch(getStatus());
				return null;
			})
			.catch(() => {});
	};
}

// RCON Actions
// the thunk action that sends the command and adds the response to state
export function sendRCONCommandToServer(command: string) {
	return (dispatch, getState) => {
		dispatch(rconSetCommand(command));
		dispatch(rconPending());
		misrcon
			.sendRCONCommandToServer({ ...getState().credentials.active, command })
			.then(res => {
				dispatch(rconRecieved(res));
			})
			.catch(e => {
				dispatch(notify.emitError(e));
			});
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
	misrcon
		.sendRCONCommandToServer({
			port: '64154',
			password: '3Jq1SAN36',
			ip: '162.244.55.44',
			command: cmd.join(' ')
		})
		.then(res => {
			// Parse the status response
			runCommand('edit-line  ');
			console.log(res);
			return true;
		})
		.catch(err => {
			runCommand(`edit-line ${err}`);
			return false;
		});
}
