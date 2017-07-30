// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import GoldenLayout from 'golden-layout';
import ConsoleWidget from './widgets/ConsoleWidget';
import HelpWidget from './widgets/HelpWidget';
import PlayersWidget from './widgets/PlayersWidget';
import StatusWidget from './widgets/StatusWidget';
import WhitelistWidget from './widgets/WhitelistWidget';
import BansWidget from './widgets/BansWidget';
import TasksWidget from './widgets/TasksWidget';

/**
 * Wraps a widget in the redux store provider
 */
function wrapWidgetInReduxProvider(Widget, store) {
	class Wrapped extends Component {
		render() {
			return (
				<Provider store={store}>
					<Widget {...this.props} />
				</Provider>
			);
		}
	}
	return Wrapped;
}

/**
 * Registers all the react components (Widgets) to the golden layout manager
 * and wraps it with wrapWidgetInReduxProvider
 * these wrapped widgets now can call connect and access all the redux store in
 * /MisRCON/app/reducers/index.js
 */
export default function registerWidgetsToLayout(
	layout: GoldenLayout,
	store: any
) {
	layout.registerComponent(
		'console-widget',
		wrapWidgetInReduxProvider(ConsoleWidget, store)
	);
	layout.registerComponent(
		'players-widget',
		wrapWidgetInReduxProvider(PlayersWidget, store)
	);
	layout.registerComponent(
		'status-widget',
		wrapWidgetInReduxProvider(StatusWidget, store)
	);
	layout.registerComponent(
		'whitelist-widget',
		wrapWidgetInReduxProvider(WhitelistWidget, store)
	);
	layout.registerComponent(
		'bans-widget',
		wrapWidgetInReduxProvider(BansWidget, store)
	);
	layout.registerComponent(
		'tasks-widget',
		wrapWidgetInReduxProvider(TasksWidget, store)
	);
	layout.registerComponent(
		'help-widget',
		wrapWidgetInReduxProvider(HelpWidget, store)
	);
}
