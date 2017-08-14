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
import ShowTaskDialogButton from '../../../../components/AddButton';
import TaskItem from './TaskItem';
import TaskDialog from './TaskDialog';
// Default Task State
import { defaultTaskState } from '../../../Tasks/state';
// Types
import type { TasksState, TaskType } from '../../../Tasks/state';
import type { SyntheticInputEvent } from '../../../../constants/FlowTypes';

class TasksWidget extends Component {
	props: {
		tasks: TasksState,
		dispatch: any
	};
	state: {
		filterValue: string,
		open: boolean,
		task: TaskType
	};

	constructor(props) {
		super(props);
		this.state = {
			filterValue: '',
			open: true,
			task: defaultTaskState
		};
	}

	toggleTaskDialog = () => {
		this.setState({ open: !this.state.open });
	};

	addTask = () => {
		this.props.dispatch(TasksActions.addTaskAndScheduleCron(this.state.task));
	};

	removeTask = (taskId: number) => {
		this.props.dispatch(TasksActions.removeTask(taskId));
	};

	pauseTask = (taskId: number) => {
		this.props.dispatch(TasksActions.pauseTask(taskId));
	};

	playTask = (taskId: number) => {
		this.props.dispatch(TasksActions.playTask(taskId));
	};

	onChangeFilterBar = ({ target }: SyntheticInputEvent) => {
		this.setState({ filterValue: target.value });
	};

	onChangeCodeEditor = (payload: string) => {
		this.setState({
			task: {
				...this.state.task,
				payload
			}
		});
	};

	toggleCodeCheckBox = ({ target = {} }: any, isInputChecked: boolean) => {
		this.setState({
			task: {
				...this.state.task,
				code: isInputChecked
			}
		});
	};

	toggleRecurringCheckBox = ({ target = {} }: any, isInputChecked: boolean) => {
		this.setState({
			task: {
				...this.state.task,
				recurring: isInputChecked
			}
		});
	};

	onChangeNameTextField = ({ target }: SyntheticInputEvent) => {
		this.setState({
			task: {
				...this.state.task,
				name: target.value
			}
		});
	};

	onChangeDatePicker = ({ target }: SyntheticInputEvent) => {
		this.setState({
			task: {
				...this.state.task,
				date: target.value
			}
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
			<div
				style={container}
			>
				<TaskDialog
					open={this.state.open}
					task={this.state.task}
					onChangeCodeEditor={this.onChangeCodeEditor}
					hideTaskDialog={this.toggleTaskDialog}
					addTask={this.addTask}
					toggleCodeCheckBox={this.toggleCodeCheckBox}
					toggleRecurringCheckBox={this.toggleRecurringCheckBox}
				/>
				<Row>
					<Spacer />
					<FilterBar
						fullWidth
						onChange={this.onChangeFilterBar}
						value={this.state.filterValue}
					/>
					<Spacer />
					<ShowTaskDialogButton handleClick={this.toggleTaskDialog} />
					<Spacer />
				</Row>

				<Column>
					{filterList.map(task =>
						<TaskItem
							key={task.id}
							task={task}
							handleClickPauseTaskButton={this.pauseTask}
							handleClickPlayTaskButton={this.playTask}
							handleClickRemoveTaskButton={this.removeTask}
						/>
					)}
				</Column>
				<Spacer />
			</div>
		);
	}
}


const container = {
	display: 'block',
	height: '100%',
	overflow: 'auto',
	padding: '5px',
	boxSizing: 'border-box'
};


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

export default connect(store => ({
	tasks: store.tasks
}))(TasksWidget);
