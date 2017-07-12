import React, { Component } from 'react';
import Console from 'react-console-component';
import styled from 'styled-components';
import fuzzy from 'fuzzy';
import * as misrcon from 'node-misrcon';

import { connect } from 'react-redux';

import './RCONConsole.global.css';
import ContextMenu from './ContextMenu';
import * as externals from '../../../package.json';

import { helpText, helpCommands } from '../../constants/HelpSection';
import { log } from '../../utils/loggerUtils';

const welcomeMessage = `MisRCON-by @Csprance
v${externals.version} - ${externals.versionName}
Type help for more options
or tab to autocomplete
--------------------------

`;

@connect(store => ({
  credentials: store.credentials
}))
class ConsoleView extends Component {
  constructor(props, context) {
    super(props, context);
    this.words = helpCommands.map(el => el.value);
    this.state = {
      contextMenuOpen: false,
      contextMenuAnchor: { x: 0, y: 0 }
    };
  }

  getHelpOn = text => {
    this.console.log(helpCommands.filter(el => el.value === text)[0].display);
    this.console.return();
  };

  handleContextMenuClick = e => {
    this.setState({
      contextMenuOpen: true,
      contextMenuAnchor: {
        x: e.pageX + 50,
        y: e.pageY - 50
      }
    });
  };

  closeContextMenu = () => {
    this.setState({
      contextMenuOpen: false
    });
  };

  complete = e => {
    return fuzzy.filter(e[0], this.words, {}).map(el => {
      return el.string;
    });
  };

  clearConsole = () => {
    const container = this.console.child.container;
    const children = [].slice.call(container.childNodes);
    children.splice(0, 1);
    children.splice(children.length - 3, 3);
    children.forEach(node => {
      container.removeChild(node);
    });
    this.console.return();
    this.closeContextMenu();
  };

  askingForHelp = text => {
    const splitText = text.split(' ');
    if (splitText[0] === 'help') if (splitText.length === 2) return true;
    return false;
  };

  handleInput = text => {
    try {
      // help // get all help commands
      if (text === 'help') this.help();
      else if (text === 'cls') {
        // cls // clear screen
        this.clearConsole();
      } else if (this.askingForHelp(text)) {
        // help [subject] // specific help docs
        this.getHelpOn(text.split(' ')[1]);
      } else {
        // send command to server
        this.sendCommand(text);
      }
    } catch (e) {
      log('error', e);
      this.console.log(String(e));
      this.console.return();
    }
  };

  help = () => {
    this.console.log(helpText);
    this.console.return();
  };

  sendCommand = command => {
    misrcon
      .sendRCONCommandToServer({ ...this.props.credentials.active, command })
      .then(res => {
        this.console.log(res);
        this.console.return();
      })
      .catch(err => {
        this.console.log(err);
        this.console.return();
      });
  };

  render() {
    return (
      <Container onContextMenu={this.handleContextMenuClick}>
        <Console
          ref={console => (this.console = console)}
          complete={this.complete}
          handler={this.handleInput}
          autofocus
          welcomeMessage={welcomeMessage}
        />
        <div
          ref={div => (this.anchorDiv = div)}
          style={{
            position: 'absolute',
            left: this.state.contextMenuAnchor.x - 50,
            top: this.state.contextMenuAnchor.y - 10
          }}
        />
        <ContextMenu
          console={this.console}
          anchorEl={this.anchorDiv}
          closeContextMenu={this.closeContextMenu}
          open={this.state.contextMenuOpen}
          clearConsole={this.clearConsole}
        />
      </Container>
    );
  }
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 1;
`;

export default ConsoleView;
