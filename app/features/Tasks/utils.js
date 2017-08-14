// @flow
/**
 * Name: utils
 * Description:
 */
import cron from 'node-schedule';

import * as misrcon from 'node-misrcon';

import type { TaskType } from './state';
import type { Dispatch, GetState } from '../../constants/ActionTypes';
import { incrementTask } from './actions';
import { getCredentialsFromAppStateById } from '../Servers/utils';
/**
 * Take a task schedule it with node-cron start it and then return the new Task object with the
 * cronJob field filled with the node-cron object it also passes down dispatch into the cron
 * function so it can increment counts.
 */
export function scheduleTask(
	task: TaskType,
	dispatch: Dispatch,
	getState: GetState
): TaskType | false {
	const cronJob = cron.scheduleJob(task.date, () => {
		misrcon
			.sendRCONCommandToServer({
				...getCredentialsFromAppStateById(getState(), task.serverId),
				command: task.payload
			})
			.then(res => {
				console.log(`${task.payload} Response: \n ${res}`);
				dispatch(incrementTask(task.id));
				return null;
			})
			.catch(() => {
				console.log(`Error running task: ${task.name} `);
			});
	});
	if (cronJob === null) {
		// TODO: Handle cron string error
		console.log('invalid cron string');
		return false;
	}

	return { ...task, cronJob };
}
