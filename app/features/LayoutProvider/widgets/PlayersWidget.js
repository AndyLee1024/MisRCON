// @flow
/**
 * Name: PlayersWidget
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ServerState } from '../../Servers/state';

class PlayersWidget extends Component {
	props: {
		servers: ServerState
	};
	render() {
		return (
			<div>
				{JSON.stringify(this.props.servers.status.players)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(PlayersWidget);
