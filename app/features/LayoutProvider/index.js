// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoldenLayout from 'golden-layout';
import type { GoldenLayout as GoldenLayoutType } from 'golden-layout';
import _ from 'lodash';

import * as layoutProvider from './actions';

import './styles.global.css';
import registerWidgetsToLayout from './registerAllComponents';

import type { Dispatch } from '../../constants/ActionTypes';

type Props = {
	layoutProvider: Object,
	store: any,
	dispatch: Dispatch
};
class LayoutProvider extends Component<any, Props, any> {
	static defaultProps = {
		layoutProvider: {
			config: {}
		},
		store: {},
		dispatch: () => {}
	};
	layout: GoldenLayoutType;
	node: HTMLElement;

	constructor(props, context) {
		super(props, context);
		window.React = React;
		window.ReactDOM = ReactDOM;
	}

	componentDidMount() {
		// Set up GoldenLayout
		this.layout = new GoldenLayout(this.props.layoutProvider.config, this.node);
		registerWidgetsToLayout(this.layout, this.props.store);
		this.layout.init();

		// Update GoldenLayout on Window Resize
		// debounce this to keep from hammering the redux store and triggering updates
		window.addEventListener(
			'resize',
			_.debounce(() => this.layout.updateSize(), 150)
		);

		// Fix the layout on load
		setTimeout(() => {
			this.layout.updateSize();
		}, 20);
		window.layout = this.layout;

		// Save the state when we change it
		this.layout.on('stateChanged', () => {
			this.props.dispatch(layoutProvider.saveLayoutState(this.layout));
		});
	}

	componentWillUnmount() {
		console.log('removing listener');
		window.removeEventListener('resize');
	}

	render() {
		return (
			<div
				style={{ height: '100vh', width: '100%' }}
				ref={node => {
					this.node = node;
				}}
			/>
		);
	}
}

export default connect(store => ({
	layoutProvider: store.layoutProvider
}))(LayoutProvider);
