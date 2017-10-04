// @flow
/**
 * Name: The Notifications Component
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Standard from './components/Standard';
import type { Dispatch } from '../../constants/ActionTypes';
import type { NotificationsState } from './state';

class Notifications extends Component {
  props: {
    notifications: NotificationsState,
    dispatch: Dispatch
  };
  render() {
    return (
      <Container>
        {this.props.notifications.sort().map((notification, index) => {
          switch (notification.theme) {
            case 'warn':
              return (
                <Standard
                  position={index}
                  key={notification.id}
                  dispatch={this.props.dispatch}
                  config={notification}
                />
              );
            case 'error':
              return (
                <Standard
                  position={index}
                  key={notification.id}
                  dispatch={this.props.dispatch}
                  config={notification}
                />
              );
            case 'info':
              return (
                <Standard
                  position={index}
                  key={notification.id}
                  dispatch={this.props.dispatch}
                  config={notification}
                />
              );
            default:
              return null;
          }
        })}
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
  display: flex;
`;

export default connect(store => ({
  notifications: store.notifications
}))(Notifications);
