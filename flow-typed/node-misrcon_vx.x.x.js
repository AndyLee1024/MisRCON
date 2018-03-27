// flow-typed signature: 7d96d8c392032b7c54f433ce7d31fc18
// flow-typed version: <<STUB>>/node-misrcon_v^0.3.13/flow_v0.48.0

import { Player } from 'node-misrcon';

/**
 * This is an autogenerated libdef stub for:
 *
 *   'node-misrcon'
 *
 * Fill this stub out by replacing all the `any` types.
 *
 * Once filled out, we encourage you to share your work with the
 * community by sending a pull request to:
 * https://github.com/flowtype/flow-typed
 */

declare module 'node-misrcon' {
	// 64 bit steam id
	declare export type SteamID = string; // 76561198034520139
	// shape of the object that you send as a command to misrcon
	declare export type CommandObject = {
		// The ip for the Server you're sending the request to
		ip: string,
		// the port of the server
		port: string,
		// the admin password for the server (RCON Password)
		password: string,
		// the actual RCON command string you want to send
		command: string
	};

	// steam: 76561198034520139  name: chrissprance  entID:1769296  id: 5  ip: 174.107.93.24:64090  ping: 276  state: 3  profile: 0
	declare export type Player = {
		// The 64 bit steam id of the player
		steam: SteamID,
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
		// unknown
		profile: string // 0
	};

	declare export type ServerStatus = {
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
		players: string // 0/50
	};

	declare export type PlayerStatus = {
		// An array of players on the server
		playersArray: Array<Player>
	};

	declare export type StatusResponse = ServerStatus & PlayerStatus;

	declare export type BanListResponse = Array<SteamID>;

	declare export type WhiteListResponse = Array<SteamID>;

	declare export type TryParseResponse =
		| {
				data: WhiteListResponse | StatusResponse | BanListResponse,
				type: 'whitelist' | 'banlist' | 'status'
			}
		| false;

	declare export type AllData = {
		status: StatusResponse,
		banlist: BanListResponse,
		whitelist: WhiteListResponse
	};

	declare export function getAllServerData(options: CommandObject): AllData;

	declare export function openConnection(
		options: CommandObject
	): Promise<boolean>;

	declare export function parseBanListResponseToJs(
		res: string
	): BanListResponse;

	declare export function parseStatusResponseToJs(
		statusString: string
	): StatusResponse;

	declare export function parseWhitelistResponseToJs(
		res: string
	): WhiteListResponse;

	declare export function sendChainedCommand(
		options: CommandObject
	): Promise<any>;

	declare export function sendRCONCommandToServer(
		options: CommandObject
	): Promise<any>;

	declare export function tryParseResponse(response: string): TryParseResponse;

	declare export class ParserError {
		constructor(message: string): ParserError;
		name: string;
	}

	declare export default {
		getAllServerData: getAllServerData,
		openConnection: openConnection,
		parseBanListResponseToJs: parseBanListResponseToJs,
		parseStatusResponseToJs: parseStatusResponseToJs,
		parseWhitelistResponseToJs: parseWhitelistResponseToJs,
		sendChainedCommand: sendChainedCommand,
		sendRCONCommandToServer: sendRCONCommandToServer,
		tryParseResponse: tryParseResponse
	}
}
