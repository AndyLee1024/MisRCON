// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import servers from '../features/Servers/reducer';

const rootReducer = combineReducers({
  router,
  servers
});

export default rootReducer;
