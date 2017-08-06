// @flow
/**
 * Name: tasks
 * Type: Redux Reducer
 * Description:
 */
import {
	ADD_TASK,
	PAUSE_TASK,
	PLAY_TASK,
	REMOVE_TASK,
	INCREMENT_TASK
} from '../../constants/ActionTypes';
import type { TasksActions } from '../../constants/ActionTypes';
import type { TasksState } from './state';
import initialState from './state';

export default function tasks(
	state: TasksState = initialState,
	action: TasksActions
): TasksState {
	switch (action.type) {
		case ADD_TASK:
			return [].concat(state, action.task);
		case REMOVE_TASK:
			return state.filter(task => task.id !== action.id);
		case PAUSE_TASK:
			return state.map(task => ({
				...task,
				enabled: task.id === action.id ? false : task.enabled
			}));
		case PLAY_TASK:
			return state.map(task => ({
				...task,
				enabled: task.id === action.id ? true : task.enabled
			}));
		case INCREMENT_TASK:
			return state.map(task => ({
				...task,
				timesRun: task.id === action.id ? task.timesRun + 1 : task.timesRun
			}));
		default:
			return state;
	}
}
