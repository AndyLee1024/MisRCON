/**
 * Name: utils
 * Description:
 */
import type { TaskType } from './state';
/**
 * Take a task schedule it with node-cron start it and then return the new Task object with the
 * cronJob field filled with the node-cron object
 */
export function scheduleTask(task: TaskType): TaskType {
	return task;
}
