// @flow
/**
 * Name: Notification Actions
 * Description: Contains all the
 */
import type { NotificationConfig } from './state';
import type { Dispatch, GetState } from '../../constants/ActionTypes';
import { createId } from './utils';

/**
 * Adds the Created notification to state
 */
function addNotification(config: NotificationConfig) {
  return {
    type: 'NOTIFY',
    config
  };
}

/**
 * Dismisses the notification
 */
export function dismissNotification(id: number) {
  return {
    type: 'DISMISS_NOTIFICATION',
    id
  };
}

/**
 * Creates an Info Notification
 */
export function emitInfo(message: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      addNotification({
        id: createId(getState().notifications),
        message,
        theme: 'info',
        timeOut: 500,
        showing: true
      })
    );
  };
}

/**
 * Creates an Error Notification
 */
export function emitError(message: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      addNotification({
        id: createId(getState().notifications),
        message,
        theme: 'error',
        timeOut: 500,
        showing: true
      })
    );
  };
}

/**
 * Creates a Warning Notification
 */
export function emitWarning(message: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      addNotification({
        id: createId(getState().notifications),
        message,
        theme: 'warn',
        timeOut: 500,
        showing: true
      })
    );
  };
}

// TODO: Allow it to accept custom react components
/**
 * Creates a Custom Notification
 */
export function emitCustom(message: string) {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(
      addNotification({
        id: createId(getState().notifications),
        message,
        theme: 'warn',
        timeOut: 500,
        showing: true
      })
    );
  };
}
