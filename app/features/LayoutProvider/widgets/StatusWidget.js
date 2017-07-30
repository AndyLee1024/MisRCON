// @flow
/**
 * Name: StatusWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ServerState } from '../../Servers/state';

class StatusWidget extends Component {
	props: {
		servers: ServerState
	};
	render() {
		return (
			<div>
				{JSON.stringify(this.props.servers.status)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(StatusWidget);

