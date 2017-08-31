/**
 * Name: bootstrap
 * Description: Contains all the stuff needed to bootstrap the app.
 * Rather than litter bootstrapping around everywhere do it all here.
 */

import { addGlobalStyling } from '../styles/theme';
import type { Dispatch } from '../constants/ActionTypes';
import * as serverActions from '../features/Servers/actions';
import { bootStrapPlayersDb } from '../features/Players/utils';

export default function(dispatch: Dispatch) {
	addGlobalStyling();
	bootStrapPlayersDb();
	dispatch(serverActions.getActiveServerData());
}
