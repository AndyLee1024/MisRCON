// @flow
/**
 * Name: PlayerCard
 * Description:
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import Paper from 'material-ui/Paper/index';
import Avatar from 'material-ui/Avatar/index';
import IconButton from 'material-ui/IconButton/index';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu/index';
import MenuItem from 'material-ui/MenuItem/index';
import TextField from 'material-ui/TextField/index';

import type { PlayerState } from '../features/Players/state';

class PlayerCard extends Component {
  props: {
    player: PlayerState,
    kickPlayer?: any,
    banPlayer?: any,
    updatePlayerNote?: any,
    whitelistPlayer?: any
  };
  static defaultProps = {
    kickPlayer: () => {},
    banPlayer: () => {},
    updatePlayerNote: () => {},
    whitelistPlayer: () => {}
  };
  render() {
    return (
      <Container>
        <Avatar
          src={this.props.player.avatarURL}
          size={42}
          style={{ margin: 4 }}
        />
        <TextField
          floatingLabelText={'notes'}
          onChange={this.props.updatePlayerNote}
        />
        {this.props.player.steam}
        {this.props.player.name}

        <br />
        <IconMenu
          iconButtonElement={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <MenuItem primaryText="Kick" onTouchTap={this.props.kickPlayer} />
          <MenuItem primaryText="Ban" onTouchTap={this.props.banPlayer} />
          <MenuItem
            primaryText="Whitelist"
            onTouchTap={this.props.whitelistPlayer}
          />
        </IconMenu>
      </Container>
    );
  }
}

const Container = styled(Paper)`
	display: flex;
	width: 250px;
	height: 150px;
	min-width: 250px;
	min-height: 150px;
	margin: 15px;
`;

export default PlayerCard;
