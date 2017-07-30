// @flow
/**
 * Name: App
 * Description: The container that holds the app and the routes
 */
import { Component } from 'react';
import type { Children } from 'react';

export default class App extends Component {
	props: {
		children: Children
	};

	render() {
		return this.props.children;
	}
}
