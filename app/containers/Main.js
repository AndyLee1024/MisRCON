// @flow
/**
 * Name: Main
 * Description: The Main Entry point for the React App.
 */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LayoutProvider from '../features/LayoutProvider';
import Servers from '../features/Servers';

import { MisRCONTheme } from '../styles/theme';
import bootStrap from '../utils/bootstrap';

import type { Store } from '../constants/ActionTypes';

class Main extends Component {
  props: {
    store: Store
  };
  componentWillMount() {
    bootStrap(this.props.store.dispatch);
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={MisRCONTheme}>
        <div style={{ display: 'flex' }}>
          <LayoutProvider store={this.props.store} />
          <Servers dispatch={this.props.store.dispatch} servers={this.props.store.getState().servers} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
