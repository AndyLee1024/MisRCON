/**
 * Name: utils
 * Description:
 */
import type { TaskType } from './state';
import type { Dispatch } from '../../constants/ActionTypes';
import { incrementTask } from './actions';
/**
 * Take a task schedule it with node-cron start it and then return the new Task object with the
 * cronJob field filled with the node-cron object it also passes down dispatch into the cron
 * function so it can increment counts.
 */
export function scheduleTask(task: TaskType, dispatch: Dispatch): TaskType {
	dispatch(incrementTask(task.id));
	return task;
}
