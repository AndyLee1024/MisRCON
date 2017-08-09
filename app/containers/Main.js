// @flow
/**
 * Name: Main
 * Description: The Main Entry point for the React App.
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import LayoutProvider from '../features/LayoutProvider';

import {MisRCONTheme, addGlobalStyling} from '../styles/theme';

class Main extends Component {
	componentWillMount() {
		addGlobalStyling();
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={MisRCONTheme}>
				<Container>
					<LayoutProvider store={this.props.store} />
				</Container>
			</MuiThemeProvider>
		);
	}
}

const Container = styled.div`display: flex;`;

export default Main;
