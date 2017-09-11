// @flow
/**
 * Name: utils
 * Description:
 */
import cron from 'node-schedule';
import misrcon, { sendRCONCommandToServer } from 'node-misrcon';
// import { transform } from 'babel-standalone';

import type { TaskType } from './state';
import type { Dispatch, GetState } from '../../constants/ActionTypes';
import { incrementTask } from './actions';
import { getCredentialsFromAppStateById } from '../Servers/utils';
/**
 * Take a task schedule it with node-cron start it and then return the new Task object with the
 * cronJob field filled with the node-cron object it also passes down dispatch into the cron
 * function so it can increment counts.
 */
export function scheduleTask(
  task: TaskType,
  dispatch: Dispatch,
  getState: GetState
): TaskType | false {
  const cronJob = cron.scheduleJob(task.date, () => {
    if (task.code) {
      window.misrcon = misrcon;
      eval(compileCode(task.payload));
    } else {
      sendRCONCommandToServer({
        ...getCredentialsFromAppStateById(getState(), task.serverId),
        command: task.payload
      })
        .then(res => {
          console.log(`${task.payload} Response: \n ${res}`);
          dispatch(incrementTask(task.id));
          return null;
        })
        .catch(() => {
          console.log(`Error running task: ${task.name} `);
        });
    }
  });
  if (!task.enabled) {
    cronJob.cancel();
  }
  if (cronJob === null) {
    // TODO: Handle cron string error
    console.log('invalid cron string');
    return false;
  }

  return { ...task, cronJob };
}

export function compileCode(code: string) {
  // TODO: Crashes npm run package-win because babel-standalone is too big and fat and meaty
  // const options = {
  //   babelrc: false,
  //   filename: 'repl',
  //   presets: ['stage-0'],
  //   plugins: ['transform-regenerator'],
  //   sourceMap: true
  // };
  // const compiled = transform(code, options);
  // return compiled.code;
  return code;
}
