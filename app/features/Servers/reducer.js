/**
 * Name: servers Reducer
 * Type: Redux Reducer
 * Description:
 */
import type { ServerState } from './state';
import initialState from './state';

export default function servers(state: ServerState = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
