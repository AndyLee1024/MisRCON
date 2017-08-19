// @flow
/**
 * Name: Tasks State
 * Description: The initial state and type declaration of the tasks
 * and any relevant bootstrapping for tasks
 */

// The individual tasks themselves
export type TaskType = {
	// a unique id used to start and cancel tasks with the node-cron lib
	id: number,

	// the server to access credentials from
	serverId: number,

	// display name for task
	name: string,

	// the code or command to run
	payload: string,

	// should we run this more than once?
	recurring: boolean,

	// datetime of when to run or cron string
	date: number | string,

	// should we eval this as js code?
	code: boolean,

	// number of times the command has been run
	timesRun: number,

	// Is this task currently being executed or is it paused
	enabled: boolean,

	// the node-cron job to pause or cancel
	cronJob: any
};

// The Array of Tasks
export type TasksState = Array<TaskType>;

// TODO: bootstrap here!
const initialState: TasksState = [];
console.log('Bootstrapped');
export const defaultTaskState: TaskType = {
	// a unique id used to start and cancel tasks with the node-cron lib
	id: -1,

	// the server to access credentials from
	serverId: -1,

	// display name for task
	name: '',

	// the code or command to run
	payload: '',

	// should we run this more than once?
	recurring: true,

	// datetime of when to run or cron string
	date: '',

	// should we eval this as js code?
	code: true,

	// number of times the command has been run
	timesRun: 0,

	// Is this task currently being executed or is it paused
	enabled: true,

	// the node-cron job to pause or cancel
	cronJob: {}
};

export default initialState;
