/**
 * Name: PlayerCard
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';

class PlayerCard extends Component {
	props: {
		steamid: number,
		kickPlayer: any,
		banPlayer: any,
		updateNote: any,
	};
	render() {
		return <Container>PlayerCard</Container>;
	}
}

const Container = styled.div`display: flex;`;

export default PlayerCard;
