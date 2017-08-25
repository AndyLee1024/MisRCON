// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoldenLayout from 'golden-layout';

import * as layoutProvider from './actions';

import './styles.global.css';
import registerWidgetsToLayout from './registerAllComponents';

class LayoutProvider extends Component {
	props: {
		layoutProvider: Object,
		store: any
	};
	layout: GoldenLayout;
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
		// We don't worry about removing it since this component will always be mounted
		window.addEventListener('resize', () => {
			this.layout.updateSize();
		});

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
