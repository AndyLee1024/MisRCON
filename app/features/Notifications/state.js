// @flow
/**
 * Name: state
 * Description:
 */

export type NotificationConfig = {
  // The unique id of the notification
  id: number,

  // the message you want to send
  message: string,

  // how lon should the notification last
  timeOut: number,

  // the theme of the notification ['error', 'warn', 'info']
  theme: 'error' | 'warn' | 'info',

  // Whether or not the notification is currently showing or it's been dismissed
  showing: boolean
};

export type NotificationsState = Array<NotificationConfig>;

const initialState: NotificationsState = [
  { id: 0, message: 'Hello', timeOut: 1500, theme: 'error', showing: true }
];
export default initialState;
