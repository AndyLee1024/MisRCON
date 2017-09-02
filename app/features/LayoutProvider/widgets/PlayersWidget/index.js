// @flow
/**
 * Name: PlayersWidget
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
// Components
import PlayerCard from '../../../../components/PlayerCard';
// Functions
import { getActiveServer } from '../../../Servers/utils';
import { getPlayerFromDb } from '../../../Players/utils';

// Types
import type { ServersState, ServerState } from '../../../Servers/state';

class PlayersWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer: ServerState = getActiveServer(this.props.servers);
		return (
			<Container>
				{activeServer.status.playersArray.map(player =>
					<PlayerCard
						key={player.steam}
						player={getPlayerFromDb(player.steam)}
					/>
				)}
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
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

export default connect(store => ({
	servers: store.servers
}))(PlayersWidget);
