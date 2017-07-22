// @flow
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import GoldenLayout from 'golden-layout';
import styled from 'styled-components';

import './styles.global.css';
import { registerAllComponents } from './registerAllComponents';


class LayoutProvider extends PureComponent {
  constructor(props) {
    super(props);
    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    // Set up GoldenLayout
    const layout = new GoldenLayout(
      this.props.layoutProvider.config,
      this.node
    );
    registerAllComponents(layout);
    layout.init();

    // Update GoldenLayout on Window Resize
    addEventListener('resize', ()=> {
      layout.updateSize();
    });

    // Fix the layout on load
    setTimeout(() => {
      layout.updateSize();
    }, 20);
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
