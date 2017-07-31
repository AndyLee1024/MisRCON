// @flow
/**
 * Name: tasks
 * Type: Redux Reducer
 * Description:
 */
import * as ActionTypes from '../../constants/ActionTypes';
import type { TasksType } from './state';
import initialState from './state';

export default function tasks(state: TasksType = initialState, action: any) {
	switch (action.type) {
		case ActionTypes.ADD_TASK:
			return [].concat(state, action.task);
		case ActionTypes.REMOVE_TASK:
			return state.filter(task => task.id !== action.id);
		default:
			return state;
	}
}
