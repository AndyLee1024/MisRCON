// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import GoldenLayout from 'golden-layout';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import BansWidget from './widgets/BansWidget';
import ConsoleWidget from './widgets/ConsoleWidget';
import HelpWidget from './widgets/HelpWidget';
import PlayersWidget from './widgets/PlayersWidget';
import StatusWidget from './widgets/StatusWidget';
import TasksWidget from './widgets/TasksWidget';
import WhitelistWidget from './widgets/WhitelistWidget';

import { MisRCONTheme } from '../../styles/theme';

/**
 * Wraps a widget in the redux store provider and material ui theme
 */
function wrapWidget(Widget, store, layout) {
  class Wrapped extends Component {
    render() {
      return (
        <Provider store={store}>
          <MuiThemeProvider muiTheme={MisRCONTheme}>
            <Widget {...this.props} layout={layout} />
          </MuiThemeProvider>
        </Provider>
      );
    }
  }
  return Wrapped;
}

/**
 * Registers all the react components (Widgets) to the golden layout manager
 * and wraps it with wrapWidget
 * these wrapped widgets now can call connect and access all the redux store in
 * /MisRCON/app/reducers/index.js
 * it can also use material ui themes
 */
export default function registerWidgetsToLayout(
  layout: GoldenLayout,
  store: any
) {
  layout.registerComponent(
    'bans-widget',
    wrapWidget(BansWidget, store, layout)
  );
  layout.registerComponent(
    'console-widget',
    wrapWidget(ConsoleWidget, store, layout)
  );
  layout.registerComponent(
    'help-widget',
    wrapWidget(HelpWidget, store, layout)
  );
  layout.registerComponent(
    'players-widget',
    wrapWidget(PlayersWidget, store, layout)
  );
  layout.registerComponent(
    'status-widget',
    wrapWidget(StatusWidget, store, layout)
  );
  layout.registerComponent(
    'tasks-widget',
    wrapWidget(TasksWidget, store, layout)
  );
  layout.registerComponent(
    'whitelist-widget',
    wrapWidget(WhitelistWidget, store)
  );
}
