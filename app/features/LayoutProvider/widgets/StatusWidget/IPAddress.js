// @flow
/**
 * Name: IPAddress
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { vividBlue, lightBlue } from '../../../../styles/colors';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  min-height: 50px;
  ${props =>
    props.height < 100 || props.width < 100 ? `flex-direction: row;` : ''};
`;

const Key = styled.div`
  color: ${lightBlue};
  padding: 10px;
`;

const Value = styled.div`
  color: ${vividBlue};
`;

class IPAddress extends Component {
  props: {
    ip: string,
    height: number,
    width: number
  };
  render() {
    return (
      <Container height={this.props.height} width={this.props.width}>
        <Key>IP:</Key>
        <Value>{this.props.ip}</Value>
      </Container>
    );
  }
}

export default IPAddress;
