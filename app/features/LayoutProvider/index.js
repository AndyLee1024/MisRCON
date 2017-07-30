// @flow
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoldenLayout from 'golden-layout';

import './styles.global.css';
import registerWidgetsToLayout from './registerAllComponents';

type Props = {
	layoutProvider: Object,
	store: any
};

class LayoutProvider extends Component<void, Props, void> {
	layout: GoldenLayout;
	node: HTMLElement;

	constructor(props, context) {
		super(props, context);
		window.React = React;
		window.ReactDOM = ReactDOM;
	}

	componentDidMount() {
		// Set up GoldenLayout
		this.layout = new GoldenLayout(
			this.props.layoutProvider.config,
			this.node
		);
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
