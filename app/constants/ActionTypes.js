// @flow
/**
 * Name: ActionTypes
 * Description: All redux ActionTypes
 */
type ActionType = string;

export const SAVE_LAYOUT_PROVIDER_STATE: ActionType = 'SAVE_LAYOUT_PROVIDER_STATE';
export const RESET_LAYOUT_PROVIDER_STATE: ActionType = 'RESET_LAYOUT_PROVIDER_STATE';
export const RESTORE_LAYOUT_PROVIDER_STATE: ActionType = 'RESTORE_LAYOUT_PROVIDER_STATE';

// RCON action types
export const SEND_RCON_COMMAND_PENDING: ActionType = 'SEND_RCON_COMMAND_PENDING';
export const SEND_RCON_COMMAND_RECEIVED: ActionType = 'SEND_RCON_COMMAND_RECEIVED';
export const SET_RCON_COMMAND: ActionType = 'SET_RCON_COMMAND';

// Credentials
export const ADD_CREDENTIALS: ActionType = 'ADD_CREDENTIALS';
export const REMOVE_CREDENTIALS: ActionType = 'REMOVE_CREDENTIALS';
export const USE_CREDENTIALS: ActionType = 'USE_CREDENTIALS';
export const LOG_OUT: ActionType = 'LOG_OUT';

// Server  - Contains all the info on the current server
export const UPDATE_SERVER_STATUS: ActionType = 'UPDATE_SERVER_STATUS';
export const FETCHING_SERVER_STATUS: ActionType = 'FETCHING_SERVER_STATUS';
export const UPDATE_SERVER_WHITELIST: ActionType = 'UPDATE_SERVER_WHITELIST';
export const FETCHING_SERVER_WHITELIST: ActionType = 'FETCHING_SERVER_WHITELIST';
export const UPDATE_SERVER_BANLIST: ActionType = 'UPDATE_SERVER_BANLIST';
export const FETCHING_SERVER_BANLIST: ActionType = 'FETCHING_SERVER_BANLIST';
export const UPDATE_ALL_SERVER_DATA: ActionType = 'UPDATE_ALL_SERVER_DATA';
export const FETCHING_ALL_SERVER_DATA: ActionType = 'FETCHING_ALL_SERVER_DATA';

// Scheduled Tasks
export const SHOW_TASK_DIALOG: ActionType = 'SHOW_TASK_DIALOG';
export const ADD_TASK: ActionType = 'ADD_TASK';
export const REMOVE_TASK: ActionType = 'REMOVE_TASK';
export const INCREMENT_TASK: ActionType = 'INCREMENT_TASK';
export const TASKS_LOADED: ActionType = 'TASKS_LOADED';
export const TOGGLE_TASK_LIST: ActionType = 'TOGGLE_TASK_LIST';

// Notification system - notify
export const EMIT_INFO: ActionType = 'EMIT_INFO';
export const EMIT_WARN: ActionType = 'EMIT_WARN';
export const EMIT_ERROR: ActionType = 'EMIT_ERROR';
export const DISMISS_NOTIFY: ActionType = 'DISMISS_NOTIFY';
