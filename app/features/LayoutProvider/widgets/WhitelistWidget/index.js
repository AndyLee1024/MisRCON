// @flow
/**
 * Name: WhitelistWidget
 * Type: Component
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
import { getPlayerFromDb } from '../../../Players/utils';


import type { ServersState, ServerState } from '../../../Servers/state';

class WhitelistWidget extends Component {
  props: {
    servers: ServersState
  };
  state: {
    filterValue: string
  };
  state = {
    filterValue: ''
  };

  onChangeFilterBar = ({ target }: SyntheticInputEvent) => {
    this.setState({ filterValue: target.value });
  };

  render() {
    const activeServer: ServerState = getActiveServer(this.props.servers);
    const fuzzyList = fuzzy
      .filter(this.state.filterValue, activeServer.whitelist, {
        extract: steamID => steamID
      })
      .map(task => task.string);
    const filterList = activeServer.whitelist.filter(
      steamID => fuzzyList.indexOf(steamID) >= 0
    );
    return (
      <Container>
        <FilterBar
          fullWidth
          onChange={this.onChangeFilterBar}
          value={this.state.filterValue}
        />
        {filterList.map(steamID =>
          <PlayerCard
            key={steamID}
            player={getPlayerFromDb(steamID)}
          />
        )}
        <Spacer />
      </Container>
    );
  }
}

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
export default connect(store => ({
	servers: store.servers
}))(WhitelistWidget);
