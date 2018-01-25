// @flow
/**
 * Name: Main
 * Description: The Main Entry point for the React App.
 */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// Components
import LayoutProvider from '../features/LayoutProvider';
import Servers from '../features/Servers';
import Notifications from '../features/Notifications';
// functions
import { MisRCONTheme } from '../styles/theme';
import bootStrap from '../utils/bootstrap';
// types
import type { Store } from '../constants/ActionTypes';

type Props = {
	store: Store
};
class Main extends Component<Props> {
	componentWillMount() {
		bootStrap(this.props.store.dispatch);
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={MisRCONTheme}>
				<div style={{ display: 'flex' }}>
					<Notifications />
					<LayoutProvider store={this.props.store} />
					<Servers
						dispatch={this.props.store.dispatch}
						servers={this.props.store.getState().servers}
					/>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Main;
