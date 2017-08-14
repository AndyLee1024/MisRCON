// @flow
/**
 * Name: Main
 * Description: The Main Entry point for the React App.
 */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LayoutProvider from '../features/LayoutProvider';

import { MisRCONTheme, addGlobalStyling } from '../styles/theme';

class Main extends Component {
	componentWillMount() {
		addGlobalStyling();
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
