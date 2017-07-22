import ConsoleWidget
  from '../../features/Servers/components/widgets/ConsoleWidget';
import PlayersWidget
  from '../../features/Servers/components/widgets/PlayersWidget';
import StatusWidget
  from '../../features/Servers/components/widgets/StatusWidget';
import WhitelistWidget
  from '../../features/Servers/components/widgets/WhitelistWidget';
import BansWidget from '../../features/Servers/components/widgets/BansWidget';
import TasksWidget from '../../features/Servers/components/widgets/TasksWidget';

/**
 * Registers all the react components (Widgets) needed for golden layout
 * @param {Object} layout - thegolden layout instance to register the components to
 */
export function registerAllComponents(layout) {
  layout.registerComponent('console-widget', ConsoleWidget);
  layout.registerComponent('players-widget', PlayersWidget);
  layout.registerComponent('status-widget', StatusWidget);
  layout.registerComponent('whitelist-widget', WhitelistWidget);
  layout.registerComponent('bans-widget', BansWidget);
  layout.registerComponent('tasks-widget', TasksWidget);
}
