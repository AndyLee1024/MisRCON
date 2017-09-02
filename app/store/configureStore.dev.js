import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

// We import these so we can dispatch them from the redux dev tools
import * as serversActions from '../features/Servers/actions';
import * as LayoutProviderActions from '../features/LayoutProvider/actions';
import * as TasksActions from '../features/Tasks/actions';

const history = createHashHistory();

const configureStore = initialState => {
	// Redux Configuration
	const middleware = [];
	const enhancers = [];

	// Thunk Middleware
	middleware.push(thunk);

	// Logging Middleware
	const logger = createLogger({
		level: 'info',
		collapsed: true
	});
	middleware.push(logger);

	// Redux DevTools Configuration
	const actionCreators = {
		...serversActions,
		...LayoutProviderActions,
		...TasksActions
	};
	// If Redux DevTools Extension is installed use it, otherwise use Redux compose
	/* eslint-disable no-underscore-dangle */
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
				actionCreators
			})
		: compose;
	/* eslint-enable no-underscore-dangle */

	// Apply Middleware & Compose Enhancers
	enhancers.push(applyMiddleware(...middleware));
	const enhancer = composeEnhancers(...enhancers);

	// Create Store
	const store = createStore(rootReducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept(
			'../reducers',
			() => store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
		);
	}

	return store;
};

export default { configureStore, history };
