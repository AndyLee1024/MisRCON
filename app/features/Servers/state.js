// @flow
/**
 * Name: Servers State
 * Description:
 */
export type Credentials = {
	// the ip address of the servers
	ip: string,

	// the port of the server
	port: string,

	// the rcon password
	password: string
};

export type Status = {
	name: string,
	ip: string,
	time: string,
	version: string,
	level: string,
	gameRules: string,
	players: string,
	playersArray: Array<string>,
	whitelist: Array<string>,
	banlist: Array<string>
};

export type ServerState = {
	// a unique id to identify the server by and get creds
	id: number,

	// is this the active server
	active: boolean,

	// The display name of the server
	name: string,

	// the server crendetials
	credentials: Credentials,

	// the status response from node-misrcon
	status: Status
};

export type ServersState = Array<ServerState>;

export default [
	{
		id: 0,
		active: true,
		name: 'Test Server 1',
		credentials: {
			ip: '192.168.1.1',
			port: '64040',
			password: 'password'
		},
		status: {
			name: 'i3d.net #457934',
			ip: '192.168.1.1:64040',
			version: '1.8.1.2',
			time: '14:30',
			level: 'islands',
			gameRules: 'mp',
			players: '3/50',
			playersArray: ['76561197975954834', '76561197975954831', '76561197975954832'],
			whitelist: ['76561197975954839', '76561197975954832'],
			banlist: ['76561197975954828', '76561197975954829']
		}
	},
	{
		id: 0,
		active: true,
		name: 'Test Server 2',
		credentials: {
			ip: '192.168.1.2',
			port: '64041',
			password: 'otherpassword'
		},
		status: {
			name: 'my cool dev server',
			ip: '192.168.1.2:64041',
			version: '1.8.1.3',
			time: '15:23',
			level: 'surface_test',
			gameRules: 'sp',
			players: '1/50',
			playersArray: ['76561197975954834'],
			whitelist: [],
			banlist: []
		}
	}
];
