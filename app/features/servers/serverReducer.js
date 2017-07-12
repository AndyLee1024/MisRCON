/**
 * Name: servers reducer
 * Type: Redux Reducer
 * Description:
 */

const initialState = [
  {
    id: 0, // the primary key
    name: 'Dev Server',
    credentials: {
      ip: '192.168.0.1',
      port: '64090',
      password: 'password'
    },
    status: {
      name: '',
      ip: '',
      version: '',
      level: '',
      gameRules: '',
      time: '',
      players: '',
      playersArray: []
    },
    whitelist: [''],
    banlist: [''],
  }
];

export default function servers(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
