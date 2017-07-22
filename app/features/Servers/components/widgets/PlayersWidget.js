/**
 * Name: PlayersWidget
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';

class PlayersWidget extends Component {
  render() {
    return (
      <Container>
        Players
      </Container>
    );
  }
}

const Container = styled.div`
    display: flex;
`;

export default PlayersWidget;
