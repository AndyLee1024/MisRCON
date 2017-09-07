// @flow
/**
 * Name: servers Reducer
 * Type: Redux Reducer
 * Description:
 */
import { storeAndReturn } from './utils';
import type { Action } from '../../constants/ActionTypes';
import type { ServersState } from './state';

import initialState from './state';

export default function servers(
  state: ServersState = initialState,
  action: Action
): ServersState {
  switch (action.type) {
    case 'MAKE_SERVER_ACTIVE':
      return storeAndReturn(
        'ServerState',
        state.map(
          server =>
            server.id === action.id
              ? { ...server, active: true }
              : { ...server, active: false }
        )
      );
    case 'ADD_NEW_SERVER':
      return storeAndReturn('ServerState', [].concat(state, action.payload));

    case 'UPDATE_SERVER_DATA':
      return storeAndReturn(
        'ServerState',
        state.map(
          server =>
            server.id === action.payload.id
              ? { ...server, ...action.payload }
              : server
        )
      );

    case 'SEND_RCON_COMMAND_PENDING':
      return storeAndReturn('ServerState', state);

    case 'FETCHING_SERVER_DATA':
      return storeAndReturn('ServerState', state);

    default:
      return storeAndReturn('ServerState', state);
  }
}
