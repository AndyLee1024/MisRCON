// @flow
/**
 * Name: WhitelistWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getActiveServer} from '../../../Servers/utils';

import type { ServersState, ServerState } from '../../../Servers/state';

class WhitelistWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer: ServerState = getActiveServer(this.props.servers);
		return (
			<div>
				{JSON.stringify(activeServer.whitelist)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(WhitelistWidget);
