// @flow
/**
 * Name: utils
 * Description:
 */
import CronJob from 'node-cron';

import type { TaskType } from './state';
import type { Dispatch } from '../../constants/ActionTypes';
import { incrementTask } from './actions';
/**
 * Take a task schedule it with node-cron start it and then return the new Task object with the
 * cronJob field filled with the node-cron object it also passes down dispatch into the cron
 * function so it can increment counts.
 */
export function scheduleTask(task: TaskType, dispatch: Dispatch): TaskType {
	const payload = task.code
		? () => {
				// TODO: Eval Code. Write up docs on what variables are going to be made available
				console.log('This is Javascript code');
			}
		: () => {
				// TODO: Execute the RCON Command
				console.log('This is an RCON Command');
			};
	const cron = new CronJob(
		task.date,
		payload,
		null,
		true,
		'America/Los_Angeles'
	);
	cron.start();
	dispatch(incrementTask(task.id));
	return { ...task, cronJob: cron };
}
