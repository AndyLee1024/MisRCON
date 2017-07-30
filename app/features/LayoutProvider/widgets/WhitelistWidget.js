// @flow
/**
 * Name: WhitelistWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ServerState } from '../../Servers/state';

class WhitelistWidget extends Component {
	props: {
		servers: ServerState
	};
	render() {
		return (
			<div>
				{JSON.stringify(this.props.servers.status.whitelist)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(WhitelistWidget);
