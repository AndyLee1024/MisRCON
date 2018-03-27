// @flow
/**
 * Name: PlayersWidget
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fuzzy from 'fuzzy';
// Components
import PlayerCard from '../../../../components/PlayerCard';
import FilterBar from '../../../../components/FilterBar';
// Functions
import { getActiveServer } from '../../../Servers/utils';

// Types
import type { PlayersState } from '../../../Players/state';
import type { SyntheticInputEvent } from '../../../../constants/ReactTypes';
import type { ServersState, ServerState } from '../../../Servers/state';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  box-sizing: border-box;
  flex-flow: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const Spacer = styled.div`
  flex-grow: 100;
`;

type Props = {
  servers: ServersState,
  players: PlayersState
};
type State = {
  filterValue: string
};
class PlayersWidget extends Component<Props, State> {
  state = {
    filterValue: ''
  };

  onChangeFilterBar = ({ target }: SyntheticInputEvent) => {
    this.setState({ filterValue: target.value });
  };

  render() {
    const activeServer: ServerState = getActiveServer(this.props.servers);
    const fuzzyList = fuzzy
      .filter(this.state.filterValue, 0, {
        extract: player => player.steam
      })
      .map(task => task.string);
    const filterList = activeServer.status.playersArray.filter(
      player => fuzzyList.indexOf(player.steam) >= 0
    );
    return (
      <Container>
        <FilterBar
          fullWidth
          onChange={this.onChangeFilterBar}
          value={this.state.filterValue}
        />
        {filterList.map(player => (
          <PlayerCard key={player.steam} player={player} />
        ))}
        <Spacer />
      </Container>
    );
  }
}

export default connect(store => ({
  players: store.players,
  servers: store.servers
}))(PlayersWidget);
