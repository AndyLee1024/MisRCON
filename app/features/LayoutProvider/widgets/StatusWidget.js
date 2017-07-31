// @flow
/**
 * Name: StatusWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { ServersState } from '../../Servers/state';

class StatusWidget extends Component {
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
}))(StatusWidget);

