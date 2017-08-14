// @flow
/**
 * Names
 * Description: All redux actions
 */
import type { ServersState } from '../features/Servers/state';
import type { LayoutProviderState } from '../features/LayoutProvider/state';
import type { TasksState, TaskType } from '../features/Tasks/state';
import type { NotificationsState } from '../features/Notifications/state';

// LayoutProvider
export const SAVE_LAYOUT_PROVIDER_STATE = 'SAVE_LAYOUT_PROVIDER_STATE';
export const RESET_LAYOUT_PROVIDER_STATE = 'RESET_LAYOUT_PROVIDER_STATE';
export const RESTORE_LAYOUT_PROVIDER_STATE = 'RESTORE_LAYOUT_PROVIDER_STATE';
export type LayoutProviderActions =
	| { type: 'SAVE_LAYOUT_PROVIDER_STATE' }
	| { type: 'RESET_LAYOUT_PROVIDER_STATE', payload: LayoutProviderState }
	| { type: 'RESTORE_LAYOUT_PROVIDER_STATE', payload: LayoutProviderState };

// Servers  - Contains all the info on the current server
export const UPDATE_SERVER_STATUS = 'UPDATE_SERVER_STATUS';
export const FETCHING_SERVER_STATUS = 'FETCHING_SERVER_STATUS';
export const UPDATE_SERVER_WHITELIST = 'UPDATE_SERVER_WHITELIST';
export const FETCHING_SERVER_WHITELIST = 'FETCHING_SERVER_WHITELIST';
export const UPDATE_SERVER_BANLIST = 'UPDATE_SERVER_BANLIST';
export const FETCHING_SERVER_BANLIST = 'FETCHING_SERVER_BANLIST';
export const UPDATE_ALL_SERVER_DATA = 'UPDATE_ALL_SERVER_DATA';
export const FETCHING_ALL_SERVER_DATA = 'FETCHING_ALL_SERVER_DATA';
export type ServersActions =
	| { type: 'UPDATE_SERVER_STATUS', task: TaskType }
	| { type: 'FETCHING_SERVER_STATUS', id: number }
	| { type: 'UPDATE_SERVER_WHITELIST', id: number }
	| { type: 'FETCHING_SERVER_WHITELIST', id: number }
	| { type: 'UPDATE_SERVER_BANLIST', payload: number }
	| { type: 'FETCHING_SERVER_BANLIST', id: number }
	| { type: 'UPDATE_ALL_SERVER_DATA', id: number }
	| { type: 'FETCHING_ALL_SERVER_DATA', id: number };

// Scheduled Tasks
type ADD_TASK = { type: 'ADD_TASK', task: TaskType };
type PAUSE_TASK = { type: 'PAUSE_TASK', id: number };
type PLAY_TASK = { type: 'PLAY_TASK', id: number };
type REMOVE_TASK = { type: 'REMOVE_TASK', id: number };
type INCREMENT_TASK = { type: 'INCREMENT_TASK', id: number };

export type TasksActions =
	| ADD_TASK
	| PAUSE_TASK
	| PLAY_TASK
	| REMOVE_TASK
	| INCREMENT_TASK
	| BaseReduxAction;

export type TaskActionsType = {
	type: string,
	task: TaskType,
	id: number
};

// Notification system - notify
export const EMIT_INFO = 'EMIT_INFO';
export const EMIT_WARN = 'EMIT_WARN';
export const EMIT_ERROR = 'EMIT_ERROR';
export const DISMISS_NOTIFY = 'DISMISS_NOTIFY';
export type NotificationActions =
	| { type: 'EMIT_INFO', msg: string }
	| { type: 'EMIT_WARN', msg: string }
	| { type: 'EMIT_ERROR', msg: string }
	| { type: 'DISMISS_NOTIFY' };

// Base Redux Types
export type BaseReduxAction = { type: string };

export type Action =
	| BaseReduxAction
	| TasksActions
	| ServersActions
	| LayoutProviderActions
	| NotificationActions;

export type Dispatch = (
	action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type AppState = {
	servers: ServersState,
	layoutProvider: LayoutProviderState,
	tasks: TasksState,
	notifications: NotificationsState
};

export type GetState = () => AppState;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type PromiseAction = Promise<Action>;
