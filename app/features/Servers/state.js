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
	version: string,
	time: string,
	players: [string],
	whitelist: [string],
	banlist: [string]
};

export type ServerState = {
	// a unique id to identify the server by and get creds
	id: number,

	// is this the active server
	active: boolean,

	// The display name of the server
	name: string,

	credentials: Credentials,
	status: Status
};

export type ServersState = Array<ServerState>;

export default [
	{
		id: 0,
		active: true,
		name: 'Loading',
		credentials: {
			ip: '192.168.1.1',
			port: '64040',
			password: 'password'
		},
		status: {
			name: 'Loading...',
			ip: 'Server 4050',
			version: '1.8.1.2',
			time: '14:30',
			players: ['76561197975954833'],
			whitelist: ['76561197975954834'],
			banlist: ['76561197975954835']
		}
	}
];
