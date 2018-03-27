// @flow
/**
 * Name: Players Actions
 */
import type { Action, Dispatch, GetState } from '../../constants/ActionTypes';
import type { PlayersState, PlayerState } from './state';
import { syncPlayer } from './utils';

/** THUNK
 * Sends a command to a server via the ConsoleWidget
 */
export const syncPlayerThunk = (player: PlayerState) => async (
	dispatch: Dispatch,
	getState: GetState
) => {
	// sync the player and then dispatch that player to be added to state
	const syncedPlayer = await syncPlayer(player);
	dispatch(addPlayer(syncedPlayer));
};

export function addPlayer(player: PlayerState): Action {
	return {
		type: 'ADD_PLAYER',
		player
	};
}
