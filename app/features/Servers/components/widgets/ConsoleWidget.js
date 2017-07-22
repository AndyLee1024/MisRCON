/**
 * Name: ConsoleWidget
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';

class ConsoleWidget extends Component {
  render() {
    return (
      <Container>
        Console
      </Container>
    );
  }
}

const Container = styled.div`
    display: flex;
`;

export default ConsoleWidget;
