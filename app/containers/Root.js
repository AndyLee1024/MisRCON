// @flow
import * as React from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './Main';
import type { Store } from '../constants/ActionTypes';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

type RootType = {
  store: Store
};

export default function Root({ store }: RootType) {
  return (
    <Provider store={store}>
      <Main store={store} />
    </Provider>
  );
}
