// @flow
/**
 * Name: layoutProvider
 * Type: Redux Reducer
 * Description:
 */
import type { Action } from '../../constants/ActionTypes';
import type { LayoutProviderState } from './state';

import defaultState from './state';

export default function layoutProvider(
  state: LayoutProviderState = defaultState,
  action: Action
): LayoutProviderState {
  switch (action.type) {
    case 'SAVE_LAYOUT_PROVIDER_STATE':
      return state;
    default:
      return state;
  }
}
