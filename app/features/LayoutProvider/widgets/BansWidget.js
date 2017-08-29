// @flow
/**
 * Name: BansWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getActiveServer } from '../../Servers/utils';

import type { ServersState, ServerState } from '../../Servers/state';

class BansWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer: ServerState = getActiveServer(this.props.servers);
		return (
			<div>
				{JSON.stringify(activeServer.banlist)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(BansWidget);
