import React, { Component } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import * as taskActions from '../../actions/scheduledTasksActions';
import * as taskUtils from '../../utils/scheduledTasksUtils';

import { black } from '../../styles/colors';
import TaskCard from './TaskCard';
import AddTasksButton from './AddTaskButton';
import CreateTaskDialog from './CreateTaskDialog';

@connect(store => ({
  tasks: store.tasks,
  server: store.server
}))
class ScheduledTasksView extends Component {
  componentDidMount() {
    this.props.dispatch(
      taskActions.loadTasks(taskUtils.getTasksFromLocalStorage())
    );
  }

  showCreateTaskDialog = () => {
    this.props.dispatch(taskActions.openCreateTaskDialog());
  };

  render() {
    return (
      <Wrapper display={this.props.tasks.display}>
        <HeaderBar>
          <HeaderTitle display={this.props.tasks.display}>
            SCHEDULED TASKS
          </HeaderTitle>
          <AddTasksButton onTouchTap={this.showCreateTaskDialog} />
        </HeaderBar>
        <TaskContainer>
          {this.props.tasks.tasks.map(task => {
            return (
              <TaskCard
                {...task}
                dispatch={this.props.dispatch}
                key={task.name}
              />
            );
          })}
        </TaskContainer>
        <CreateTaskDialog />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  transition-duration: 0.3s; 
  width: ${props => (props.display ? 0 : '420px')};
  flex-direction: column;
  align-items: stretch;
`;

const TaskContainer = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 10px;
  min-width: 410px;
  align-items: center;
`;

const HeaderBar = styled.div`
  z-index: 200;
  min-height:72px;
  max-height: 72px;
  flex-grow: 1;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${black};
  min-width: 300px;
`;

const HeaderTitle = styled.div`
  min-width: 300px;
`;

export default ScheduledTasksView;
