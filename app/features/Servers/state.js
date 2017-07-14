// @flow
/**
 * Name: Servers State
 * Description:
 */
interface Credentials {
  ip: string,
  port: string,
  password: string
}
interface Status {
  name: string,
  ip: string,
  version: string,
  time: string,
  players: [string],
  whitelist: [string],
  banlist: [string]
}
export interface ServerState {
  id: number,
  name: string,
  credentials: Credentials,
  status: Status
}

export default {
  id: 0,
  name: '',
  credentials: {
    ip: '',
    port: '',
    password: ''
  },
  status: {
    name: '',
    ip: '',
    version: '',
    time: '',
    players: [''],
    whitelist: [''],
    banlist: ['']
  }
};
