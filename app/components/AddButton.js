// @flow
/**
 * Name: AddButton
 * Description:
 */
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton/index';
import AddIcon from 'material-ui/svg-icons/content/add';

class AddButton extends Component {
	props: {
		handleClick: any
	};

	render() {
		const style = { color: 'white', height: 25, width: 25, minWidth: 25 };
		return (
			<RaisedButton primary style={style} onTouchTap={this.props.handleClick}>
				<AddIcon />
			</RaisedButton>
		);
	}
}

export default AddButton;
