// @flow
/**
 * Name: TasksWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import fuzzy from 'fuzzy';

// Actions
import * as TasksActions from '../../../Tasks/actions';

// Components
import FilterBar from '../../../../components/FilterBar';
import AddTaskButton from '../../../../components/AddButton';
import TaskItem from './TaskItem';
import TaskDialog from './TaskDialog';

// Types
import type { TasksState } from '../../../Tasks/state';
import type { SyntheticInputEvent } from '../../../../constants/FlowTypes';

class TasksWidget extends Component {
	props: {
		tasks: TasksState,
		dispatch: any
	};
	state: {
		filterValue: string
	};

	constructor(props) {
		super(props);
		this.state = {
			filterValue: ''
		};
	}

	handleClickAddTaskButton = () => {
		this.props.dispatch(
			// TODO: Hook this up to a dialog and get the user input
			TasksActions.addTaskAndScheduleCron({
				id: Date.now(),
				serverId: 0,
				name: 'New Task',
				payload: 'sv_say This is a test!',
				recurring: false,
				date: Date.now(),
				code: true,
				timesRun: 0,
				enabled: true,
				cronJob: {}
			})
		);
	};

	handleClickRemoveTaskButton = (taskId: number) => {
		this.props.dispatch(TasksActions.removeTask(taskId));
	};

	handleClickPauseTaskButton = (taskId: number) => {
		this.props.dispatch(TasksActions.pauseTask(taskId));
	};

	handleClickPlayTaskButton = (taskId: number) => {
		this.props.dispatch(TasksActions.playTask(taskId));
	};

	onChangeFilterBar = ({ target }: SyntheticInputEvent) => {
		this.setState({
			filterValue: target.value
		});
	};

	render() {
		const fuzzyList = fuzzy
			.filter(this.state.filterValue, this.props.tasks, {
				extract: task => task.name
			})
			.map(task => task.string);
		const filterList = this.props.tasks.filter(
			task => fuzzyList.indexOf(task.name) >= 0
		);
		return (
			<Container>
				<TaskDialog handleClickAddTaskButton={this.handleClickAddTaskButton} />
				<Row>
					<Spacer />
					<FilterBar
						fullWidth
						onChange={this.onChangeFilterBar}
						value={this.state.filterValue}
					/>
					<Spacer />
					<AddTaskButton handleClick={this.handleClickAddTaskButton} />
					<Spacer />
				</Row>

				<Column>
					{filterList.map(task =>
						<TaskItem
							key={task.id}
							task={task}
							handleClickPauseTaskButton={this.handleClickPauseTaskButton}
							handleClickPlayTaskButton={this.handleClickPlayTaskButton}
							handleClickRemoveTaskButton={this.handleClickRemoveTaskButton}
						/>
					)}
				</Column>
				<Spacer />
			</Container>
		);
	}
}

const Spacer = styled.div`
	display: flex;
	flex-grow: 1;
	width: 40px;
`;

const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	width: 100%;
	min-height: 50px;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
	width: 100%;
`;

const Container = styled.div`
	display: block;
	height: 100%;
	overflow: auto;
	padding: 5px;
	box-sizing: border-box;
`;

export default connect(store => ({
	tasks: store.tasks
}))(TasksWidget);
