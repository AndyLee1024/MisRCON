// @flow
/**
 * Name: WhitelistWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ServersState } from '../../Servers/state';

class WhitelistWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		return (
			<div>
				{JSON.stringify(this.props.servers)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(WhitelistWidget);
