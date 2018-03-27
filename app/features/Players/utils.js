// @flow
// TODO Migrate to PouchDB
/**
 * Name: utils
 * Description:
 */
import axios from 'axios';
import store from 'store';
import type { Player } from 'node-misrcon';

import { steamApiKey } from '../../../secrets';
import { defaultPlayer } from './state';
import type { PlayerState, PlayersState } from './state';

// the name of the players database
const dbName: string = 'misrcon-players-db';

/**
 * Normalise the playersArray from node-misrcon PlayersArray<PlayerState> to our internal PlayersArray<PlayerState>
 */
export const normalizePlayersArray = (players: Array<Player>): PlayersState =>
  players.map(player => ({ ...defaultPlayer, ...player }));

/**
 * Bootstraps the database for use
 */
export const bootStrapPlayersDb = (): void => {
  if (store.get(dbName) === undefined) {
    console.log('boot strapping db');
    store.set(dbName, []);
  }
};

/**
 * Gets all the players from the PlayersDatabase
 */
export const getAllPlayers = (): PlayersState => store.get(dbName);

/**
 * Gets a player from the PlayersDatabase if it doesn't exist create it and return it
 */
export async function getPlayer(steam: string): Promise<PlayerState> {
  const storedPlayer = await getAllPlayers().filter(
    player => player.steam === steam
  )[0];
  if (storedPlayer) {
    // player exists
    return syncPlayer(storedPlayer);
  }
  // player doesn't exist
  return syncPlayer({
    ...defaultPlayer,
    avatarURL: 'http://placehold.it/42x42',
    steam
  });
}

/**
 * Adds/Updates a player to the PlayersDatabase and returns it
 */
export async function syncPlayer(player: PlayerState): Promise<PlayerState> {
  // the PlayersDatabase without the current player in it
  const storedPlayers = await getAllPlayers().filter(
    pl => pl.steam !== player.steam
  );
  const currentPlayer = await getAllPlayers().filter(
    pl => pl.steam === player.steam
  )[0];
  if (currentPlayer) {
    // player exists
    const savedPlayer = {
      ...player,
      lastSeen: new Date().toISOString(),
      avatarURL: currentPlayer.avatarURL
    };
    store.set(dbName, [].concat(storedPlayers, savedPlayer));
    return savedPlayer;
  }
  // player doesn't exist
  const savedPlayer = {
    ...player,
    lastSeen: new Date().toISOString(),
    avatarURL: await getSteamAvatar(player.steam)
  };
  store.set(dbName, [].concat(storedPlayers, savedPlayer));
  return savedPlayer;
}

/**
 * Sets and gets the player in the PlayersDatabase
 */
export async function getSteamAvatar(steam: string): Promise<string> {
  console.log('Getting Steam Avatar for: ', steam);
  const res = await axios.get(
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
    {
      params: {
        key: steamApiKey,
        steamids: steam
      }
    }
  );
  const player = res.data.response.players[0];
  return player;
}

export async function getAvatar(
  steam: string,
  cancelToken: any
): Promise<string> {
  const player = store.get(steam);
  if (player !== undefined) {
    return player.avatar;
  }
  const res = await axios.get(
    'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/',
    {
      cancelToken,
      params: {
        key: steamApiKey,
        steamids: steam
      }
    }
  );
  console.log('silly', 'calling Gaben for avatars');
  // store the player data in local storage
  store.set(steam, {
    ...store.get(steam),
    avatar: res.data.response.players[0].avatar
  });
  return res.data.response.players[0].avatar;
}
