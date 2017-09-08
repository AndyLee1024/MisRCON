// @flow
/**
 * Name: The Notifications Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { Dispatch } from '../../constants/ActionTypes';
import Standard from './components/Standard';
import type { NotificationsState } from './state';

class Notifications extends Component {
  props: {
    notifications: NotificationsState,
    dispatch: Dispatch
  };
  render() {
    return (
      <div>
        {this.props.notifications.map(notification => {
          switch (notification.theme) {
            case 'warn':
              return (
                <Standard
                  key={notification.id}
                  dispatch={this.props.dispatch}
                  config={notification}
                />
              );
            case 'error':
              return (
                <Standard
                  key={notification.id}
                  dispatch={this.props.dispatch}
                  config={notification}
                />
              );
            case 'info':
              return (
                <Standard
                  key={notification.id}
                  dispatch={this.props.dispatch}
                  config={notification}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    );
  }
}

export default connect(store => ({
  notifications: store.notifications
}))(Notifications);
