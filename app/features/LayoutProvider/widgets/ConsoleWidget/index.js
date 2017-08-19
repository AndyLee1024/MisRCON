// @flow
/**
 * Name: ConsoleWidget
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Terminal from 'terminal-in-react';

import * as serverActions from '../../../Servers/actions';

import helpString from '../../../../../CVARHelp.md';

type Props = {
	dispatch: any
};

class ConsoleWidget extends Component {
	descriptions: Object;
	commands: Object;

	constructor(props: Props) {
		super(props);
		this.descriptions = {
			clear: '',
			sv_servername: '',
			wm_timeScale: '',
			g_pinglimit: '',
			g_pingLimitTimer: '',
			g_idleKickTime: '',
			g_gameRules_Camera: '',
			mis_ban_steamid: '',
			mis_ban_status: '',
			mis_ban_remove: '',
			mis_whitelist_add: '',
			mis_whitelist_remove: '',
			mis_whitelist_status: '',
			status: '',
			sv_say: '',
			wm_startPattern: '',
			wm_disable: '',
			wm_forceTime: '',
			wm_timeOffset: '',
			mis_kick: ''
		};
		this.commands = {
			help: {
				method: (args: Object, print: any) => {
					print(helpString);
				}
			}
		};
	}

	commandPassThrough = command => {
		// TODO: This is broken here I just left off it's broken because it's trying to get the credentials state
		this.props.dispatch(serverActions.sendRCONCommandToServer(command));
	};

	render() {
		return (
			<div style={Container}>
				<Terminal
					color="white"
					backgroundColor="transparent"
					barColor="transparent"
					style={{ flexGrow: 1, fontSize: '1em' }}
					commands={this.commands}
					descriptions={this.descriptions}
					msg="MisRCON v2.0.0 type help for more info."
					commandPassThrough={this.commandPassThrough}
				/>
			</div>
		);
	}
}

const Container = {
	display: 'flex',
	height: '100%',
	overflowY: 'scroll',
	paddingLeft: '5px'
};

export default connect(store => ({
	servers: store.servers
}))(ConsoleWidget);