/**
 * Name: tasks reducer
 * Type: Redux Reducer
 * Description:
 */
import * as taskTypes from './taskTypes';

const initialState = [
  {
    id: 0, // id of the tasks to stop start cancel
    server: 0, // id of server to execute task on
    type: taskTypes.COMMAND, // taskTypes.COMMAND, taskTypes.CODE
    time: new Date(), //when exactly does this command execute
    recurring: true, // does this repeat?
    payload: '' // the actual command or code to run
  }
];

export default function tasks(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
