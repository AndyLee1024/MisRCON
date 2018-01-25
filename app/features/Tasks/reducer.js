// @flow
/**
 * Name: tasks
 * Type: Redux Reducer
 * Description:
 */
import store from 'store';
import type { Action } from '../../constants/ActionTypes';
import type { TasksState } from './state';
import initialState from './state';

export default function tasksReducer(
	state: TasksState = initialState,
	action: Action
): TasksState {
	let tasks = [];
	switch (action.type) {
		case 'ADD_TASK':
			tasks = [].concat(state, action.task);
			store.set('tasks', tasks);
			return tasks;

		case 'REMOVE_TASK':
			state.forEach(task => {
				if (task.id === action.id) {
					task.cronJob.cancel();
				}
			});
			tasks = state.filter(task => task.id !== action.id);
			store.set('tasks', tasks);
			return tasks;

		case 'PAUSE_TASK':
			state.forEach(task => {
				if (task.id === action.id) {
					task.cronJob.cancel();
				}
			});
			tasks = state.map(task => ({
				...task,
				enabled: task.id === action.id ? false : task.enabled
			}));
			store.set('tasks', tasks);
			return tasks;

		case 'PLAY_TASK':
			state.forEach(task => {
				if (task.id === action.id) {
					task.cronJob.reschedule(task.date);
				}
			});
			tasks = state.map(task => ({
				...task,
				enabled: task.id === action.id ? true : task.enabled
			}));
			store.set('tasks', tasks);
			return tasks;

		case 'INCREMENT_TASK':
			tasks = state.map(task => ({
				...task,
				timesRun: task.id === action.id ? task.timesRun + 1 : task.timesRun
			}));
			store.set('tasks', tasks);
			return tasks;

		default:
			return state;
	}
}
