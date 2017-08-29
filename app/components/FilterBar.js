// @flow
/**
 * Name: index
 * Description:
 */
import React, { Component } from 'react';

import TextField from 'material-ui/TextField/index';

class FilterBar extends Component {
	props: {
		value: string,
		fullWidth: boolean,
		onChange: any
	};
	render() {
		return (
			<TextField
				fullWidth={this.props.fullWidth}
				onChange={this.props.onChange}
				value={this.props.value}
				name={'FilterBar'}
				hintText={'Filter...'}
			/>
		);
	}
}

export default FilterBar;
