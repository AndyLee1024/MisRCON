// @flow
/**
 * Name: BansWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getActiveServer} from '../../Servers/utils';

import type { ServersState } from '../../Servers/state';


class BansWidget extends Component {
	props: {
		servers: ServersState
	};
	render() {
		const activeServer = getActiveServer(this.props.servers);
		return (
			<div>
				{JSON.stringify(activeServer.status.banlist)}
			</div>
		);
	}
}

export default connect(store => ({
	servers: store.servers
}))(BansWidget);
