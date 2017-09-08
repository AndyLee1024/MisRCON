// @flow
/**
 * Name: Servers State
 * Description:
 */
import store from 'store';
import type { BanListResponse, WhiteListResponse } from 'node-misrcon';

import type { PlayersState } from '../Players/state';
import { dev, us75 } from '../../../secrets';

export type Credentials = {
  // the ip address of the servers
  ip: string,

  // the port of the server
  port: string,

  // the rcon password
  password: string
};

export type StatusState = {
  // The name of the server
  name: string, // US75

  // The IP of the server
  ip: string, // 192.168.1.1

  // The Time of Day from the server
  time: string, // 14:30

  // The Dedicated Server Version
  version: string, // 184321

  // The map being run on the server currently
  level: string, // islands

  // The game rules of the dedicated server
  gameRules: string, // Miscreated

  // The numer of players on the server
  players: string, // 0/50

  playersArray: PlayersState
};

export type ServerState = {
  // a unique id to identify the server by and get creds
  id: number,

  // is this the active server
  active: boolean,

  // The display name of the server
  name: string,

  // the server credentials
  credentials: Credentials,

  // the banned players on this server
  banlist: BanListResponse,

  // the status response contains the playersArray
  status: StatusState,

  // the array of whitelisted players
  whitelist: WhiteListResponse
};

export type ServersState = Array<ServerState>;

const storedState = store.get('ServersState');

export const defaultState: ServersState = [
  {
    id: 0,
    active: false,
    name: 'Dev Server',
    credentials: dev,
    status: {
      name: 'i3d.net #457934',
      ip: '192.168.1.1:64040',
      version: '1.8.1.2',
      time: '14:30',
      level: 'islands',
      gameRules: 'mp',
      players: '3/50',
      playersArray: [
        {
          steam: '76561197975954834',
          name: 'chrissprance',
          entID: '1769296',
          id: '5',
          ip: '176.54.310:64090',
          ping: '276',
          state: '3',
          profile: '0',
          notes: '',
          avatarURL: 'http://placehold.it/42x42',
          lastSeen: new Date().toISOString()
        },
        {
          steam: '76561197975954831',
          name: 'other_player_guy',
          entID: '1769286',
          id: '2',
          ip: '176.21.310:64090',
          ping: '128',
          state: '2',
          profile: '0',
          notes: '',
          avatarURL: 'http://placehold.it/42x42',
          lastSeen: new Date().toISOString()
        }
      ]
    },
    whitelist: ['76561197975954839', '76561197975954832', '76561197975954834'],
    banlist: ['76561197975954828', '76561197975954829', '76561197975954834']
  },
  {
    id: 1,
    active: true,
    name: 'US75',
    credentials: us75,
    status: {
      name: 'my cool dev server',
      ip: '192.168.1.2:64041',
      version: '1.8.1.3',
      time: '15:23',
      level: 'surface_test',
      gameRules: 'sp',
      players: '1/50',
      playersArray: [
        {
          steam: '76561197975954823',
          name: 'this_final_guy',
          entID: '1769286',
          id: '1',
          ip: '123.21.310:64090',
          ping: '12',
          state: '1',
          profile: '0',
          notes: '',
          avatarURL: 'http://placehold.it/42x42',
          lastSeen: new Date().toISOString()
        },
        {
          steam: '76561197975954831',
          name: 'other_player_guy',
          entID: '1769286',
          id: '2',
          ip: '176.21.310:64090',
          ping: '128',
          state: '2',
          profile: '0',
          notes: '',
          avatarURL: 'http://placehold.it/42x42',
          lastSeen: new Date().toISOString()
        }
      ]
    },
    whitelist: ['76561197975954832', '76561197975954834'],
    banlist: ['76561197975954828', '76561197975954831']
  }
];

export default (storedState === undefined ? defaultState : storedState);
