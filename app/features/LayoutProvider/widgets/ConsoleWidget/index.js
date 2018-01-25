// @flow
/**
 * Name: ConsoleWidget
 * Description:
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Terminal from 'terminal-in-react';

import * as serverActions from '../../../Servers/actions';

// import helpString from '../../../../../CVARHelp.md';

import './console.global.css';

import type { PrintToConsoleFunction } from './types';

type Props = {
	dispatch: any
};

class ConsoleWidget extends Component {
	descriptions: Object; // All auto completes and there help string [help string not used]
	commands: Object; // any console command not defined here falls through to commandPassThrough

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
				method: (args: Object, print: PrintToConsoleFunction) => {
					print(
						```
					Test
					```
					);
				}
			}
		};
	}

	commandPassThrough = (
		command: Array<string>,
		print: PrintToConsoleFunction
	) => {
		this.props.dispatch(
			serverActions.sendConsoleCommandToServer(command, print)
		);
	};

	render() {
		return (
			<div style={Container}>
				<Terminal
					watchConsoleLogging={false}
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
