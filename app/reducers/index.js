// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import servers from '../features/Servers/reducer';
import layoutProvider from '../features/LayoutProvider/reducer';

const rootReducer = combineReducers({
  router,
  servers,
  layoutProvider
});

export default rootReducer;
