// @flow
/**
 * Name: actions
 * Description:
 */
import type { TaskType } from './state';
import * as ActionTypes from '../../constants/ActionTypes';

/**
 * This function adds a task to state
 * and schedules a task to be executed by node-cron
 */
export function addTask(task: TaskType) {
	return {
		type: ActionTypes.ADD_TASK,
		task
	};
}


/**
 * This function removes a task from state
 * and cancels the task to be executed by node-cron
 */
export function removeTask(id: number) {
	return {
		type: ActionTypes.REMOVE_TASK,
		id
	};
}
