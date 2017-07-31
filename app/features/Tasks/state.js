// @flow
/**
 * Name: Tasks State
 * Description: The initial state and type declaration of the tasks
 */
// The Array of Tasks
export type TasksType = Array<TaskType>;

// The individual tasks themselves
export type TaskType = {
	id: number, // a unique id used to start and cancel tasks with the node-cron lib
	serverId: number, // the server to access credentials from
	name: string, // display name for task
	payload: string, // the code or command to run
	recurring: boolean, // should we run this more than once?
	date: number | string, // datetime of when to run or cron string
	code: boolean // should we eval this as js code?
};

const initialState: TasksType = [
	{
		id: 0,
		serverId: 0,
		name: 'Task Name',
		payload: 'sv_say This is a test!',
		recurring: true,
		date: '* * * * *',
		code: false
	}
];

export default initialState;
