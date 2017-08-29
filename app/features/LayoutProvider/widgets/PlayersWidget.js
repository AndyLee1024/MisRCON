// @flow
/**
 * Name: PlayersWidget
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveServer } from '../../Servers/utils';
import type { ServersState, ServerState } from '../../Servers/state';

class PlayersWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer: ServerState = getActiveServer(this.props.servers);
		return (
			<div>
				{JSON.stringify(activeServer.status.playersArray)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(PlayersWidget);
