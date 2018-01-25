// @flow
/**
 * Name: state
 * Description: The Players State (based around the PlayerState type of node-misrcon
 */
// ISO8601 Extended Format
export type ISO8601DateString = string; // 2017-08-31T04:23:01.933Z

export type PlayerState = {
	// The 64 bit steam id of the player
	steam: string,
	// The name of the player
	name: string, // chrissprance
	// The network entity id
	entID: string, // 1769296
	// The id of the player for the server
	id: string, // 5
	// the ip of the player
	ip: string, // 192.168.1.1:64090
	// the ping to the server from the player
	ping: string, // 276
	// the state of the player
	state: string, // 0-3
	// unknown - data from server
	profile: string, // 0
	// notes about the player
	notes: string, // 0
	// the url for the steam profile avatar
	avatarURL?: string, // http://placehold.it/42x42
	// When the player was last seen on the server (by MisRCON not by the server) - ISO 8601 Extended Format
	lastSeen?: ISO8601DateString, // 2017-08-31T04:23:01.933Z
	// what server Ids this player is banned from
	bannedOn?: Array<number>, // [0, 1]
	// what server Ids this player is whitelisted on
	whitelistedOn?: Array<number> // [0, 1, 2]
};

export type PlayersState = Array<PlayerState>;

// this is the default player we can use anywhere we need to initialize a new player
export const defaultPlayer: PlayerState = {
	steam: '',
	name: '',
	entID: '',
	id: '',
	ip: '',
	ping: '',
	state: '',
	profile: '',
	notes: '',
	avatarURL: '',
	lastSeen: new Date().toISOString(),
	bannedOn: [1],
	whitelistedOn: [1]
};

export const initialState: PlayersState = [defaultPlayer];

export default initialState;
