// @flow
/**
 * Name: Servers React Component
 * Description: This component provides a way to add new servers and select stored servers
 */
import React, { Component } from 'react';
import { ipcRenderer } from 'electron';
import styled from 'styled-components';

import { switchToServer } from './actions';
import type { Dispatch } from '../../constants/ActionTypes';
import { darkBlue, black } from '../../styles/colors';
import type { ServersState } from './state';

type Props = {
  servers: ServersState,
  dispatch: Dispatch
};

type State = {
  open: boolean
};

class Servers extends Component<void, Props, State> {
  state = {
    open: false
  };

  componentDidMount() {
    ipcRenderer.on('NEW_SERVER_CLICKED', () => {
      this.show();
    });
  }

  show = () => {
    this.setState({
      open: true
    });
  };

  hide = () => {
    this.setState({
      open: false
    });
  };

  // Selects a server and hides the Dialog
  handleServerItemClick = (id: number) => {
    this.hide();
    this.props.dispatch(switchToServer(id));
  };

  render() {
    return (
      <Container open={this.state.open}>
        <ServerSelectContainer>
          {this.props.servers.map(server =>
            <ServerItem
              key={server.id}
              onClick={() => {
                this.handleServerItemClick(server.id);
              }}
            >
              {server.name}
            </ServerItem>
          )}
        </ServerSelectContainer>
      </Container>
    );
  }
}

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: ${props => (props.open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  z-index: 2;
  background: ${darkBlue};
`;

const ServerSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 500px;
  background: ${black};
`;
const ServerItem = styled.div`
  width: 100%;
  height: 80px;
  cursor: pointer;
`;

export default Servers;
