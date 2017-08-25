// @flow
/**
 * Name: WhitelistWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getActiveServer} from '../../Servers/utils';

import type { ServersState } from '../../Servers/state';

class WhitelistWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer = getActiveServer(this.props.servers);
		return (
			<div>
				{JSON.stringify(activeServer.status.whitelist)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(WhitelistWidget);
