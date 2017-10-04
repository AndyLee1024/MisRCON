// @flow
/**
 * Name: Players Actions
 */
import type { Action, Dispatch, GetState } from '../../constants/ActionTypes';
import type { PlayersState, PlayerState } from './state';

/** THUNK
 * Sends a command to a server via the ConsoleWidget
 */
export function syncPlayer(player: PlayerState) {
  return (dispatch: Dispatch, getState: GetState) => {
    // Do stuff
  };
}

export function addPlayer(player: PlayerState): Action {
  return {
    type: 'ADD_PLAYER',
    player
  };
}
