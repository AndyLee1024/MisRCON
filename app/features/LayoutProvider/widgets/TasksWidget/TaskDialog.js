// @flow
/**
 * Name: TaskDialog
 * Description:
 */
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog/index';
import styled from 'styled-components';

type Props = {
	handleClickAddTaskButton: any
};
class TaskDialog extends Component {
	state: {
		open: boolean
	};

	constructor(props: Props) {
		super(props);
		this.state = {
			open: true
		};
	}

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	render() {
		const actions = [];
		return (
			<Dialog
				title="Dialog With Actions"
				actions={actions}
				modal={false}
				open={this.state.open}
				onRequestClose={this.handleClose}
			>
				The actions in this window were passed in as an array of React objects.
			</Dialog>
		);
	}
}

const Container = styled.div`display: flex;`;

export default TaskDialog;
