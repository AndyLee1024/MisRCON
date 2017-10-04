// @flow
/**
 * Name: AddButton
 * Description:
 */
import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton/index';
import AddIcon from 'material-ui/svg-icons/content/add';

class AddButton extends Component {
  props: {
    handleClick: any
  };
  render() {
    return (
      <IconButton tooltip={'Add Task'} onTouchTap={this.props.handleClick}>
        <AddIcon />
      </IconButton>
    );
  }
}

export default AddButton;
