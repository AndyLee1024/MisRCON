// @flow
import { combineReducers } from 'redux';
import layoutProvider from '../features/LayoutProvider/reducer';
// import notifications from '../features/Notifications/reducer';
import servers from '../features/Servers/reducer';
import tasks from '../features/Tasks/reducer';

const rootReducer = combineReducers({
	layoutProvider,
	// notifications,
	servers,
	tasks
});

export default rootReducer;
