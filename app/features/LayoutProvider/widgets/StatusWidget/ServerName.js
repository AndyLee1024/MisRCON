// @flow
/**
 * Name: ServerName
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';

import { vividBlue, lightBlue } from '../../../../styles/colors';

class ServerName extends Component {
	props: {
		name: string,
		height: number,
		width: number,
	};
	render() {
		return (
			<Container height={this.props.height} width={this.props.width}>
				<Key>Name:</Key>
				<Value>
					{this.props.name}
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
	min-width: 50px;
	min-height: 50px;
	${props => (props.height < 100 || props.width < 100 ? `flex-direction: row;` : '')};
`;
const Key = styled.div`
	color: ${lightBlue};
	padding: 10px;
`;

const Value = styled.div`
	color: ${vividBlue};
`;

export default ServerName;
