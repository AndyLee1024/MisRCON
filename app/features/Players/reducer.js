// @flow
/**
 * Name: Players Reducer
 * Type: Redux Reducer
 * Description:
 */
import type { Action } from '../../constants/ActionTypes';
import type { PlayersState } from './state';

import defaultState from './state';

export default function players(
  state: PlayersState = defaultState,
  action: Action
): PlayersState {
  switch (action.type) {
    case 'SAVE_LAYOUT_PROVIDER_STATE':
      return state;
    default:
      return state;
  }
}
