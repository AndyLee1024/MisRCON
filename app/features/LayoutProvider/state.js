/**
 * Name: state
 * Description:
 */
export default {
  config: {
    settings:{
      hasHeaders: true,
      constrainDragToContainer: true,
      reorderEnabled: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      blockedPopoutsThrowError: true,
      closePopoutsOnUnload: true,
      showPopoutIcon: false,
      showMaximiseIcon: true,
      showCloseIcon: false
    },
    dimensions: {
      borderWidth: 5,
      minItemHeight: 10,
      minItemWidth: 10,
      headerHeight: 20,
      dragProxyWidth: 300,
      dragProxyHeight: 200
    },
    labels: {
      close: 'close',
      maximise: 'maximise',
      minimise: 'minimise',
      popout: 'open in new window'
    },
    content: [
      {
        type: 'row',
        content: [
          {
            type: 'react-component',
            component: 'console-widget',
            title: 'Console',
            isClosable: false,
          },
          {
            type: 'column',
            content: [
              {
                type: 'react-component',
                component: 'players-widget',
                title: 'Players',
                isClosable: false,
              },
              {
                type: 'react-component',
                component: 'status-widget',
                title: 'Status',
                isClosable: false,
              },
              {
                type: 'react-component',
                component: 'tasks-widget',
                title: 'Tasks',
                isClosable: false,
              },
              {
                type: 'react-component',
                component: 'bans-widget',
                title: 'Bans',
                isClosable: false,
              },
              {
                type: 'react-component',
                component: 'whitelist-widget',
                title: 'Whitelist',
                isClosable: false,
              }
            ]
          }
        ]
      }
    ]
  }
};
