// @flow
/**
 * Name: state
 * Description:
 */
import store from 'store';
import type { Config } from 'golden-layout';

// Bootstrap
const storedConfig = store.get('layoutProviderConfig');

export const defaultConfig: Config = {
  settings: {
    hasHeaders: true,
    constrainDragToContainer: true,
    reorderEnabled: true,
    selectionEnabled: false,
    popoutWholeStack: false,
    blockedPopoutsThrowError: true,
    closePopoutsOnUnload: true,
    showPopoutIcon: false,
    showMaximiseIcon: true,
    showCloseIcon: false,
    responsiveMode: 'onload',
    tabOverlapAllowance: 0,
    reorderOnTabMenuClick: true,
    tabControlOffset: 10
  },
  dimensions: {
    borderWidth: 5,
    borderGrabWidth: 15,
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
    popout: 'open in new window',
    popin: 'pop in',
    tabDropdown: 'additional tabs'
  },
  content: [
    {
      type: 'row',
      isClosable: true,
      reorderEnabled: true,
      title: '',
      content: [
        {
          type: 'stack',
          header: {},
          isClosable: true,
          reorderEnabled: true,
          title: '',
          activeItemIndex: 2,
          width: 29.308703892021818,
          height: 100,
          content: [
            {
              type: 'component',
              component: 'bans-widget',
              title: 'Bans',
              isClosable: false,
              componentName: 'lm-react-component',
              reorderEnabled: true
            },

            {
              type: 'component',
              component: 'whitelist-widget',
              title: 'Whitelist',
              isClosable: false,
              componentName: 'lm-react-component',
              reorderEnabled: true
            },
            {
              type: 'component',
              component: 'players-widget',
              title: 'Players',
              isClosable: false,
              componentName: 'lm-react-component',
              reorderEnabled: true
            },
            {
              type: 'component',
              component: 'help-widget',
              title: 'Help',
              isClosable: false,
              componentName: 'lm-react-component',
              reorderEnabled: true
            }
          ]
        },
        {
          type: 'column',
          isClosable: true,
          reorderEnabled: true,
          title: '',
          width: 70.2554723531889,
          content: [
            {
              type: 'stack',
              header: {},
              isClosable: true,
              reorderEnabled: true,
              title: '',
              activeItemIndex: 0,
              height: 43.75,
              content: [
                {
                  type: 'component',
                  component: 'console-widget',
                  title: 'Console',
                  isClosable: false,
                  componentName: 'lm-react-component',
                  reorderEnabled: true
                }
              ]
            },
            {
              type: 'row',
              isClosable: true,
              reorderEnabled: true,
              title: '',
              height: 56.25,
              content: [
                {
                  type: 'stack',
                  header: {},
                  isClosable: true,
                  reorderEnabled: true,
                  title: '',
                  activeItemIndex: 0,
                  width: 50,
                  height: 56.25,
                  content: [
                    {
                      type: 'component',
                      component: 'tasks-widget',
                      title: 'Tasks',
                      isClosable: false,
                      componentName: 'lm-react-component',
                      reorderEnabled: true
                    }
                  ]
                },
                {
                  type: 'stack',
                  header: {},
                  isClosable: true,
                  reorderEnabled: true,
                  title: '',
                  activeItemIndex: 0,
                  width: 50,
                  content: [
                    {
                      type: 'component',
                      component: 'status-widget',
                      title: 'Status',
                      isClosable: false,
                      componentName: 'lm-react-component',
                      reorderEnabled: true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  isClosable: true,
  reorderEnabled: true,
  title: '',
  openPopouts: [],
  maximisedItemId: null
};

export type LayoutProviderState = {
  config: Config
};

export default {
  config: storedConfig === undefined ? defaultConfig : storedConfig
};
