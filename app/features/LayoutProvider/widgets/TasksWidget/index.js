// @flow
/**
 * Name: TasksWidget
 * Type: Component
 * Description:
 */
import React, { Component } from 'react';
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
import type { SyntheticInputEvent } from '../../../../constants/ReactTypes';

const container = {
	display: 'block',
	height: '100%',
	overflow: 'auto',
	padding: '5px',
	boxSizing: 'border-box'
};

const spacer = {
	display: 'flex',
	flexGrow: 1,
	width: '40px'
};

const Row = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	flexGrow: 1,
	width: '100%',
	minHeight: '50px'
};

const Column = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	flexGrow: 1,
	width: '100%'
};


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
			open: false,
			task: defaultTaskState
		};
	}

	componentDidMount() {
		// Bootstrap tasks
		this.props.dispatch(TasksActions.bootStrap());
	}


	toggleTaskDialog = () => {
		this.setState({ open: !this.state.open });
	};

	addTask = () => {
		this.props.dispatch(
			TasksActions.addTaskAndScheduleCron({
				...this.state.task,
				id: Date.now()
			})
		);
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

	onChangeDatePicker = (event: null, date) => {
		this.setState({
			task: {
				...this.state.task,
				date: date.toString()
			}
		});
	};

	onChangeCronStringTextField = ({ target }: SyntheticInputEvent) => {
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
			<div style={container}>
				<TaskDialog
					open={this.state.open}
					task={this.state.task}
					onChangeCodeEditor={this.onChangeCodeEditor}
					hideTaskDialog={this.toggleTaskDialog}
					addTask={this.addTask}
					onChangeNameTextField={this.onChangeNameTextField}
					onChangeCronStringTextField={this.onChangeCronStringTextField}
					onChangeDatePicker={this.onChangeDatePicker}
					toggleCodeCheckBox={this.toggleCodeCheckBox}
					toggleRecurringCheckBox={this.toggleRecurringCheckBox}
				/>
				<div style={Row}>
					<div style={spacer} />
					<FilterBar
						fullWidth
						onChange={this.onChangeFilterBar}
						value={this.state.filterValue}
					/>
					<div style={spacer} />
					<ShowTaskDialogButton handleClick={this.toggleTaskDialog} />
					<div style={spacer} />
				</div>

				<div style={Column}>
					{filterList.map(task =>
						<TaskItem
							key={task.id}
							task={task}
							handleClickPauseTaskButton={this.pauseTask}
							handleClickPlayTaskButton={this.playTask}
							handleClickRemoveTaskButton={this.removeTask}
						/>
					)}
				</div>
				<div style={spacer} />
			</div>
		);
	}
}



export default connect(store => ({
	tasks: store.tasks
}))(TasksWidget);
