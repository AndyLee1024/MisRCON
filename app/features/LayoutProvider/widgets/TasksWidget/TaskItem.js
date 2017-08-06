// @flow
/**
 * Name: TaskItem
 * Description:
 */
import React, { Component } from 'react';
import Paper from 'material-ui/Paper/index';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import styled from 'styled-components';
import IconButton from 'material-ui/IconButton/index';

import type { TaskType } from '../../../Tasks/state';

class TaskItem extends Component {
	props: {
		task: TaskType,
		handleClickRemoveTaskButton: any,
		handleClickPauseTaskButton: any,
		handleClickPlayTaskButton: any
	};

	render() {
		const PauseButton = (
			<IconButton
				touch
				tooltip={'Pause'}
				onTouchTap={() => {
					this.props.handleClickPauseTaskButton(this.props.task.id);
				}}
			>
				<PauseIcon />
			</IconButton>
		);

		const PlayButton = (
			<IconButton
				touch
				tooltip={'Play'}
				onTouchTap={() => {
					this.props.handleClickPlayTaskButton(this.props.task.id);
				}}
			>
				<PlayIcon />
			</IconButton>
		);

		const DeleteButton = (
			<IconButton
				touch
				tooltip={'Delete'}
				onTouchTap={() => {
					this.props.handleClickRemoveTaskButton(this.props.task.id);
				}}
			>
				<TrashIcon />
			</IconButton>
		);

		const EditButton = (
			<IconButton touch tooltip={'Edit'}>
				<EditIcon />
			</IconButton>
		);

		return (
			<Container>
				<div>
					Name: {this.props.task.name}
				</div>

				<div>
					{this.props.task.recurring ? 'Cron: ' : 'Date: '}
					{this.props.task.date}
				</div>

				<div>
					Times Run:{this.props.task.timesRun}
				</div>

				<div>
					Command: {this.props.task.payload}
				</div>

				<Actions>
					{EditButton}
					{DeleteButton}
					{this.props.task.enabled ? PauseButton : PlayButton}
				</Actions>
			</Container>
		);
	}
}

const Actions = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const Container = styled(Paper)`
	display: flex;
	flex-direction: column;
	margin: 10px;
	width: 90%;
	min-height: 50px;
	padding: 10px;
	box-sizing: border-box;
`;

export default TaskItem;
