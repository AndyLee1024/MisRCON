// @flow
import { combineReducers } from 'redux';
import layoutProvider from '../features/LayoutProvider/reducer';
import notifications from '../features/Notifications/reducer';
import servers from '../features/Servers/reducer';

const rootReducer = combineReducers({
	layoutProvider,
	notifications,
	servers,
});

export default rootReducer;
