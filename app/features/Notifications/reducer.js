/**
 * Name: notifications
 * Type: Redux Reducer
 * Description:
 */
import initialState from './state';
import type { Action } from '../../constants/ActionTypes';
import type { NotificationsState } from './state';

export default function notifications(
  state: NotificationsState = initialState,
  action: Action
): NotificationsState {
  switch (action.type) {
    case 'DISMISS_NOTIFICATION':
      return state.filter(notification => notification.id !== action.id);
    case 'NOTIFY':
      return [].concat(state, action.config);
    default:
      return state;
  }
}
