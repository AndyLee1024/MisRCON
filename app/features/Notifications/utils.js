import _ from 'lodash';
import type { NotificationsState } from './state';

export function createId(state: NotificationsState) {
  const ids = state.map(notification => notification.id);
  return _.max(ids) + 1;
}
