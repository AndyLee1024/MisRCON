// @flow
/**
 * Names
 * Description: All redux actions
 */
import type { ServersState, ServerState } from '../features/Servers/state';
import type { LayoutProviderState } from '../features/LayoutProvider/state';
import type { TasksState, TaskType } from '../features/Tasks/state';
import type { NotificationsState } from '../features/Notifications/state';

//////////////////
// AppState Type
//////////////////
export type AppState = {
	servers: ServersState,
	layoutProvider: LayoutProviderState,
	tasks: TasksState,
	notifications: NotificationsState
};

//////////////////
// Every action we have in the app
//////////////////
export type Action =
	| BaseReduxAction
	| TasksActions
	| ServersActions
	| LayoutProviderActions
	| NotificationActions;

//////////////////
// LayoutProvider
//////////////////
export type LayoutProviderActions =
	| { type: 'SAVE_LAYOUT_PROVIDER_STATE' }
	| { type: 'RESET_LAYOUT_PROVIDER_STATE', payload: LayoutProviderState }
	| { type: 'RESTORE_LAYOUT_PROVIDER_STATE', payload: LayoutProviderState };

//////////////////
// Servers  - The Actions that control the Servers
//////////////////
export type ServersActions =
	| { type: 'UPDATE_SERVER_DATA', payload: ServerState }
	| { type: 'SEND_RCON_COMMAND_PENDING' }
	| { type: 'FETCHING_SERVER_DATA', id: number };

//////////////////
// Scheduled Tasks
//////////////////
export type TasksActions =
	| { type: 'ADD_TASK', task: TaskType }
	| { type: 'PAUSE_TASK', id: number }
	| { type: 'PLAY_TASK', id: number }
	| { type: 'REMOVE_TASK', id: number }
	| { type: 'INCREMENT_TASK', id: number };

//////////////////
// Notification system - notify
//////////////////
export type NotificationActions =
	| { type: 'EMIT_INFO', msg: string }
	| { type: 'EMIT_WARN', msg: string }
	| { type: 'EMIT_ERROR', msg: string }
	| { type: 'DISMISS_NOTIFY' };

// used to dispatch redux actions
export type Dispatch = (
	action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type GetState = () => AppState;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;

export type PromiseAction = Promise<Action>;

// Redux Emits a bunch of it's own stuff so I need to allow those
export type BaseReduxAction = { type: $Subtype<string> };
