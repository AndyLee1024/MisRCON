// @flow
/**
 * Name: Main
 * Description: The Main Entry point for the React App.
 */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LayoutProvider from '../features/LayoutProvider';

import { MisRCONTheme } from '../styles/theme';
import bootStrap from '../utils/bootstrap';

class Main extends Component {
	props: {
		store: any
	};
	componentWillMount() {
		bootStrap(this.props.store.dispatch);
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={MisRCONTheme}>
				<div style={{ display: 'flex' }}>
					<LayoutProvider store={this.props.store} />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Main;
