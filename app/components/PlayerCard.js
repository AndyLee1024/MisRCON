// @flow
/**
 * Name: PlayerCard
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper/index';
import Avatar from 'material-ui/Avatar/index';

import type { Player } from '../features/Players/state';

class PlayerCard extends Component {
	props: {
		player: Player,
		kickPlayer?: any,
		banPlayer?: any,
		updatePlayerNote?: any,
		whitelistPlayer?: any
	};
	render() {
		return (
			<Container>
				<Avatar
					src={this.props.player.avatarURL}
					size={42}
					style={{ margin: 4 }}
				/>
				{this.props.player.steam}
				{this.props.player.name}
				<br />
			</Container>
		);
	}
}

const Container = styled(Paper)`
	display: flex;
	width: 250px;
	height: 150px;
	min-width: 250px;
	min-height: 150px;
	margin: 15px;
`;

export default PlayerCard;
