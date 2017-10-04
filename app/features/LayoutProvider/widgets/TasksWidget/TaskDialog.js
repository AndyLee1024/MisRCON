// @flow
/**
 * Name: TaskDialog
 * Description:
 */
import React from 'react';
import Dialog from 'material-ui/Dialog/index';
import TextField from 'material-ui/TextField/index';
import CheckBox from 'material-ui/Checkbox/index';
import FlatButton from 'material-ui/FlatButton/index';
import TimePicker from 'material-ui/TimePicker/index';
import DatePicker from 'material-ui/DatePicker/index';
import CodeEditor from '../../../../components/CodeEditor';

import type { TaskType } from '../../../Tasks/state';

type Props = {
  // the function to add the task to state
  addTask: any,

  // function to hide the task dialog
  hideTaskDialog: any,

  // Is this dialog open or closed
  open: boolean,

  // function to update the value used in the TaskType.payload
  onChangeCodeEditor: any,

  // function to change the TaskType.code
  toggleCodeCheckBox: any,

  // function change the TaskType.recurring
  toggleRecurringCheckBox: any,

  // function that changes Task.name
  onChangeNameTextField: any,

  // function that changes date if it's an actual date object
  onChangeDatePicker: any,

  // function that changes Task.date the time
  onChangeTimePicker: any,

  // function to change the Task.date if it's a cron string
  onChangeCronStringTextField: any,

  // the task values to add
  task: TaskType
};

const TaskDialog = (props: Props) => {
  const CancelButton = (
    <FlatButton onTouchTap={props.hideTaskDialog}>Cancel</FlatButton>
  );

  const SubmitTaskButton = (
    <FlatButton onTouchTap={props.addTask}>Submit</FlatButton>
  );

  return (
    <Dialog
      title="Add/Edit Task"
      autoScrollBodyContent
      autoDetectWindowHeight
      actions={[CancelButton, SubmitTaskButton]}
      modal={false}
      open={props.open}
      onRequestClose={props.hideTaskDialog}
    >
      <TextField
        fullWidth
        name={'name'}
        hintText={'Name'}
        onChange={props.onChangeNameTextField}
      />

      {props.task.recurring ?
        <TextField
          fullWidth
          hintText={'Cron String'}
          value={props.task.date}
          name={'Date'}
          onChange={props.onChangeCronStringTextField}
        />
        :
        <div>
          <DatePicker onChange={props.onChangeDatePicker} hintText={'Date'} />
          <TimePicker onChange={props.onChangeTimePicker} hintText={'Time'} />
        </div>}

      <CodeEditor
        onChangeCodeEditor={props.onChangeCodeEditor}
        value={props.task.payload}
      />

      <CheckBox
        checked={props.task.recurring}
        onCheck={props.toggleRecurringCheckBox}
        label="Recurring"
      />

      <CheckBox
        checked={props.task.code}
        onCheck={props.toggleCodeCheckBox}
        label="Code"
      />
    </Dialog>
  );
};

export default TaskDialog;
