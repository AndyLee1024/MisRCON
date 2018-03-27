// @flow
/**
 * Name: StatusWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Clock from './Clock';
import IPAddress from './IPAddress';
import ServerName from './ServerName';
import ServerVersion from './ServerVersion';
import NumPlayers from './NumPlayers';

import { getActiveServer } from '../../../Servers/utils';

import type { ServersState } from '../../../Servers/state';
import type { Container } from 'golden-layout';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  ${props => (props.width < 100 ? `flex-direction: column;` : '')};
`;

const Left = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  ${props =>
    props.height < 100 || props.width < 100 ? `flex-direction: row;` : ''};
`;

const Center = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  ${props =>
    props.height < 100 || props.width < 100 ? `flex-direction: row;` : ''};
`;

const Right = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-around;
  ${props =>
    props.height < 100 || props.width < 100 ? `flex-direction: row;` : ''};
`;

class StatusWidget extends Component {
  props: {
    servers: ServersState,
    glContainer: Container
  };
  state: {
    width: number,
    height: number
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      width: this.props.glContainer.width,
      height: this.props.glContainer.height
    };
  }

  componentDidMount() {
    this.props.glContainer.on('resize', () => {
      this.setState({
        width: this.props.glContainer.width,
        height: this.props.glContainer.height
      });
    });
  }

  render() {
    const activeServer = getActiveServer(this.props.servers);
    return (
      <Wrapper width={this.state.width}>
        <Left height={this.state.height} width={this.state.width}>
          <ServerName
            name={activeServer.status.name}
            height={this.state.height}
            width={this.state.width}
          />
          <NumPlayers
            numPlayers={activeServer.status.players}
            height={this.state.height}
            width={this.state.width}
          />
        </Left>
        <Center height={this.state.height} width={this.state.width}>
          <Clock
            time={activeServer.status.time}
            height={this.state.height}
            width={this.state.width}
          />
        </Center>
        <Right height={this.state.height} width={this.state.width}>
          <ServerVersion
            version={activeServer.status.version}
            height={this.state.height}
            width={this.state.width}
          />
          <IPAddress
            ip={activeServer.status.ip}
            height={this.state.height}
            width={this.state.width}
          />
        </Right>
      </Wrapper>
    );
  }
}

export default connect(store => ({
  servers: store.servers
}))(StatusWidget);
