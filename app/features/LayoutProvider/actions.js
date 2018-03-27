// @flow
/**
 * Name: actions
 * Description:
 */
import store from 'store';

import type { GoldenLayout } from 'golden-layout';
import type { Action } from '../../constants/ActionTypes';

export const saveLayoutState = (layout: GoldenLayout): Action => {
  store.set('layoutProviderConfig', layout.toConfig());
  return {
    type: 'SAVE_LAYOUT_PROVIDER_STATE'
  };
};
