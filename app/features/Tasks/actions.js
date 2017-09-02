// @flow
/**
 * Name: actions
 * Description:
 */
import store from 'store';
import { scheduleTask } from './utils';

import type { TaskType } from './state';

import type {
  GetState,
  Action,
  Dispatch,
  ThunkAction
} from '../../constants/ActionTypes';

/**
 * This thunk adds a task to state
 * and schedules a task to be executed by node-cron
 */
export const bootStrap = (): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const storedTasks = store.get('tasks');
  if (storedTasks !== undefined) {
    storedTasks.forEach(task => {
      dispatch(addTaskAndScheduleCron(task));
    });
  }
};

/**
 * This function adds a task to state
 */
export function addTask(task: TaskType): Action {
  return {
    type: 'ADD_TASK',
    task
  };
}
/**
 * This thunk adds a task to state
 * and schedules a task to be executed by node-cron
 */
export const addTaskAndScheduleCron = (task: TaskType): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  const scheduledTask = scheduleTask(task, dispatch, getState);
  if (scheduledTask) {
    dispatch(addTask(scheduledTask));
  }
};

/**
 * This function removes a task from state
 * and cancels the task to be executed by node-cron
 */
export function removeTask(id: number): Action {
  return {
    type: 'REMOVE_TASK',
    id
  };
}

/**
 * This function pauses a task in state
 * and removes the task from the execution queue
 */
export function pauseTask(id: number): Action {
  return {
    type: 'PAUSE_TASK',
    id
  };
}

/**
 * This function modifies the enabled:true to a task in state
 * and adds the task to the execution queue
 */
export function playTask(id: number): Action {
  return {
    type: 'PLAY_TASK',
    id
  };
}

/**
 * This function increments the task timesRun field based on the id of the task
 */
export function incrementTask(id: number): Action {
  return {
    type: 'INCREMENT_TASK',
    id
  };
}
