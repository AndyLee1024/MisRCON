// @flow
/**
 * Name: WhitelistWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PlayerCard from '../../../../components/PlayerCard';

import {getActiveServer} from '../../../Servers/utils';
import { getPlayerFromDb } from '../../../Players/utils';

import type { ServersState, ServerState } from '../../../Servers/state';

class WhitelistWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer: ServerState = getActiveServer(this.props.servers);
		return (
			<Container>
				{activeServer.whitelist.map(steamid =>(
					<PlayerCard key={steamid} player={getPlayerFromDb(steamid)}/>
				))}
			</Container>
		);
	}
}

const Container = styled.div`
	display: flex;
	flex-direction: row; 
	padding: 10px;
	box-sizing: border-box;
`;

export default connect(store => ({
	servers: store.servers
}))(WhitelistWidget);
