// @flow
/**
 * Name: Clock
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { vividBlue, lightBlue } from '../../../../styles/colors';


class Clock extends Component {
	props: {
		time: string,
		height: number,
		width: number,
	};
	render() {
		return (
			<Container height={this.props.height} width={this.props.width}>
				<Key>
					Time:
				</Key>
				<Value>
					{this.props.time}
				</Value>
			</Container>
		);
	}
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-width: 80px;
	min-height: 80px;
	position: relative;
	${props => (props.height < 380 || props.width < 100 ? `flex-direction: row;` : '')};
`;

const Key = styled.div`
	color: ${lightBlue};
	
`;

const Value = styled.div`
	color: ${vividBlue};
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0; 
	left: 0;
`;

export default Clock;
