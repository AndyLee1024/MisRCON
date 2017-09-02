// @flow
// TODO Migrate to PouchDB
/**
 * Name: utils
 * Description:
 */
import store from 'store';
import type { PlayersArray as NMPlayersArray } from 'node-misrcon';

import type { Player, PlayersState, ISO8601DateString } from './state';
import { defaultPlayer } from './state';

// the name of the players database
const dbName: string = 'misrcon-players-db';

/**
 * Bootstraps the database for use
 */
export const bootStrapPlayersDb = (): void => {
	if (store.get(dbName) === undefined) {
		store.set(dbName, []);
	}
};

/**
 * Gets all the players from the database
 */
export const getPlayersFromDb = (): PlayersState => store.get(dbName);

/**
 * Adds/Overwrites(puts) a player in the database
 */
export const putPlayerToDb = (player: Player) => {
	store.set(dbName, [].concat(getPlayersFromDb(), player));
};

/**
 * Gets a player by steamid from the database
 * if the player doesn't exist it will create it and return the new player
 */
export const getPlayerFromDb = (steam: string): Player => {
	let player = getPlayersFromDb().filter(
		storedPlayer => storedPlayer.steam === steam
	)[0];
	if (player === undefined) {
		player = { ...defaultPlayer, steam };
		putPlayerToDb(player);
	}

	return player;
};

/**
 * returns a player with the last seen value updated
 */
export const updateLastSeen = (
	player: Player,
	time: ISO8601DateString = new Date().toISOString()
): Player => ({ ...player, lastSeen: time });

/**
 * Updates the player in the players database and grabs any values from the db that are blank on inserted player
 */
export const syncPlayer = (player: Player): Player => {
	return player;
};

/**
 * Normalise the playersArray from node-misrcon PlayersArray<Player> to our internal PlayersArray<Player>
 */
export const normalizePlayersArray = (
	players: NMPlayersArray
): PlayersState => {
	return players.map(player => ({ ...defaultPlayer, ...player }));
};
