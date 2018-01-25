// @flow
/**
 * Names
 * Description: All redux actions
 */
import type { Store as ReduxStore, DispatchAPI } from 'redux';
import type { ServersState, ServerState } from '../features/Servers/state';
import type { LayoutProviderState } from '../features/LayoutProvider/state';
import type { TasksState, TaskType } from '../features/Tasks/state';
import type {
  NotificationsState,
  NotificationConfig
} from '../features/Notifications/state';
import type { PlayerState } from '../features/Players/state';

/**
 * AppState Type
 */
export type AppState = {
  servers: ServersState,
  layoutProvider: LayoutProviderState,
  tasks: TasksState,
  notifications: NotificationsState
};

// Redux Emits a bunch of it's own stuff so I need to allow those
export type BaseReduxAction = { type: $Subtype<string> };

/**
 * LayoutProvider - layout
 */
export type LayoutProviderActions =
  | { type: 'SAVE_LAYOUT_PROVIDER_STATE' }
  | { type: 'RESET_LAYOUT_PROVIDER_STATE', payload: LayoutProviderState }
  | { type: 'RESTORE_LAYOUT_PROVIDER_STATE', payload: LayoutProviderState };

/**
 * Servers  - The Actions that control the Servers - servers
 */
export type ServersActions =
  | { type: 'UPDATE_SERVER_DATA', payload: ServerState }
  | { type: 'ADD_NEW_SERVER', payload: ServerState }
  | { type: 'SEND_RCON_COMMAND_PENDING' }
  | { type: 'FETCHING_SERVER_DATA', id: number }
  | { type: 'MAKE_SERVER_ACTIVE', id: number };

/**
 * Scheduled Tasks - tasks
 */
export type TasksActions =
  | { type: 'ADD_TASK', task: TaskType }
  | { type: 'PAUSE_TASK', id: number }
  | { type: 'PLAY_TASK', id: number }
  | { type: 'REMOVE_TASK', id: number }
  | { type: 'INCREMENT_TASK', id: number };

/**
 * Notification system - notify
 */
export type NotificationActions =
  | { type: 'NOTIFY', config: NotificationConfig }
  | { type: 'DISMISS_NOTIFICATION', id: number };

/**
 * Players - players
 */
export type PlayersActions = { type: 'ADD_PLAYER', player: PlayerState };

/**
 * Every action we have in the app
 */
export type Action =
  | BaseReduxAction
  | TasksActions
  | ServersActions
  | LayoutProviderActions
  | NotificationActions
  | PlayersActions;

// used to dispatch redux actions
export type Dispatch = DispatchAPI<Action | ThunkAction>;

export type Store = ReduxStore<AppState, Action, Dispatch>;

export type GetState = () => AppState;

export type ThunkAction = (dispatch: Dispatch, getState: () => AppState) => any;
