// @flow
/**
 * Name: TasksWidget
 * Type: Component
 * Description:
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import type { TasksType } from '../../../Tasks/state';

class TasksWidget extends Component {
	props: {
		tasks: TasksType
	};
	render() {
		return (
			<div>
				{JSON.stringify(this.props.tasks)}
			</div>
		);
	}
}

export default connect(store => ({
	tasks: store.tasks
}))(TasksWidget);
