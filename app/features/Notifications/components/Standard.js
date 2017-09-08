// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton/index';

import { black, red, yellow } from '../../../styles/colors';
import type { Dispatch } from '../../../constants/ActionTypes';
import { dismissNotification } from '../actions';
import type { NotificationConfig } from '../state';

class StandardNotification extends Component {
  state: {
    showing: boolean
  };
  props: {
    dispatch: Dispatch,
    config: NotificationConfig
  };
  state = {
    showing: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        showing: false
      });
    }, this.props.config.timeOut);
  }

  render() {
    let color;
    if (this.props.config.theme === 'info') {
      color = black;
    }
    if (this.props.config.theme === 'warn') {
      color = yellow;
    }
    if (this.props.config.theme === 'error') {
      color = red;
    }
    return (
      <Container color={color}>
        <Wrapper>
          <div style={{ width: '100%', textAlign: 'left', paddingLeft: 10 }}>
            {this.props.config.message}
          </div>
          <div style={{ paddingRight: 10 }}>
            <FlatButton
              onTouchTap={() => {
                this.props.dispatch(dismissNotification(this.props.config.id));
              }}
            >
              Ok
            </FlatButton>
          </div>
        </Wrapper>
      </Container>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  background: ${props => props.color};
  position: absolute;
  bottom: 10px;
  width: 350px;
  height: 60px;
  right: 20px;
  z-index: 999;
`;
export default StandardNotification;
