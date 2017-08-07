// @flow
/**
 * Name: actions
 * Description:
 */
import type { TaskType } from './state';

import type {
	GetState,
	TasksActions,
	Dispatch,
	ThunkAction
} from '../../constants/ActionTypes';

/**
 * This function adds a task to state
 */
export function addTask(task: TaskType): TasksActions {
	return {
		type: 'ADD_TASK',
		task
	};
}
/**
 * This thunk adds a task to state
 * and schedules a task to be executed by node-cron
 */
export const addTaskAndScheduleCron = (task: TaskType): ThunkAction => (
	dispatch: Dispatch,
	getState: GetState
) => {
	dispatch(addTask(task));
	const credentials = getState().servers.filter(
		server => server.id === task.serverId
	)[0].credentials;
	console.log(credentials);
};

/**
 * This function removes a task from state
 * and cancels the task to be executed by node-cron
 */
export function removeTask(id: number): TasksActions {
	return {
		type: 'REMOVE_TASK',
		id
	};
}

/**
 * This function pauses a task in state
 * and removes the task from the execution queue
 */
export function pauseTask(id: number): TasksActions {
	return {
		type: 'PAUSE_TASK',
		id
	};
}

/**
 * This function modifies the enabled:true to a task in state
 * and adds the task to the execution queue
 */
export function playTask(id: number): TasksActions {
	return {
		type: 'PLAY_TASK',
		id
	};
}

/**
 * This function increments the task timesRun field based on the id of the task
 */
export function incrementTask(id: number): TasksActions {
	return {
		type: 'INCREMENT_TASK',
		id
	};
}
