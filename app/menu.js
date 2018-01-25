import { app, Menu, shell } from 'electron';

export default class MenuBuilder {
	constructor(mainWindow) {
		this.mainWindow = mainWindow;
	}

	buildMenu() {
		if (process.env.NODE_ENV === 'development') {
			this.setupDevelopmentEnvironment();
		}

		let template;

		if (process.platform === 'darwin') {
			template = this.buildDarwinTemplate();
		} else {
			template = this.buildDefaultTemplate();
		}

		const menu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(menu);

		return menu;
	}

	setupDevelopmentEnvironment() {
		this.mainWindow.openDevTools();
	}

	buildDarwinTemplate() {
		const subMenuAbout = {
			label: 'Electron',
			submenu: [
				{
					label: 'About ElectronReact',
					selector: 'orderFrontStandardAboutPanel:'
				},
				{ type: 'separator' },
				{ label: 'Services', submenu: [] },
				{ type: 'separator' },
				{
					label: 'Hide ElectronReact',
					accelerator: 'Command+H',
					selector: 'hide:'
				},
				{
					label: 'Hide Others',
					accelerator: 'Command+Shift+H',
					selector: 'hideOtherApplications:'
				},
				{ label: 'Show All', selector: 'unhideAllApplications:' },
				{ type: 'separator' },
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: () => {
						app.quit();
					}
				}
			]
		};
		const subMenuEdit = {
			label: 'Edit',
			submenu: [
				{ label: 'Undo', accelerator: 'Command+Z', selector: 'undo:' },
				{ label: 'Redo', accelerator: 'Shift+Command+Z', selector: 'redo:' },
				{ type: 'separator' },
				{ label: 'Cut', accelerator: 'Command+X', selector: 'cut:' },
				{ label: 'Copy', accelerator: 'Command+C', selector: 'copy:' },
				{ label: 'Paste', accelerator: 'Command+V', selector: 'paste:' },
				{
					label: 'Select All',
					accelerator: 'Command+A',
					selector: 'selectAll:'
				}
			]
		};
		const subMenuViewDev = {
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: () => {
						this.mainWindow.webContents.reload();
					}
				},
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
					}
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: 'Alt+Command+I',
					click: () => {
						this.mainWindow.toggleDevTools();
					}
				}
			]
		};
		const subMenuViewProd = {
			label: 'View',
			submenu: [
				{
					label: 'Toggle Full Screen',
					accelerator: 'Ctrl+Command+F',
					click: () => {
						this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
					}
				}
			]
		};
		const subMenuWindow = {
			label: 'Window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'Command+M',
					selector: 'performMiniaturize:'
				},
				{ label: 'Close', accelerator: 'Command+W', selector: 'performClose:' },
				{ type: 'separator' },
				{ label: 'Bring All to Front', selector: 'arrangeInFront:' }
			]
		};
		const subMenuHelp = {
			label: 'Help',
			submenu: [
				{
					label: 'Learn More',
					click() {
						shell.openExternal('http://electron.atom.io');
					}
				},
				{
					label: 'Documentation',
					click() {
						shell.openExternal(
							'https://github.com/atom/electron/tree/master/docs#readme'
						);
					}
				},
				{
					label: 'Community Discussions',
					click() {
						shell.openExternal('https://discuss.atom.io/c/electron');
					}
				},
				{
					label: 'Search Issues',
					click() {
						shell.openExternal('https://github.com/atom/electron/issues');
					}
				}
			]
		};

		const subMenuView =
			process.env.NODE_ENV === 'development' ? subMenuViewDev : subMenuViewProd;

		return [subMenuAbout, subMenuEdit, subMenuView, subMenuWindow, subMenuHelp];
	}

	buildDefaultTemplate() {
		return [
			{
				label: '&File',
				submenu: [
					{
						label: '&Settings',
						accelerator: 'Ctrl+O',
						click: () => {
							this.mainWindow.webContents.send('TOGGLE_APP_SETTINGS_DIALOG');
						}
					},
					{
						label: '&Close',
						accelerator: 'Ctrl+Q',
						click: () => {
							this.mainWindow.close();
						}
					}
				]
			},
			{
				label: '&View',
				submenu: [
					{
						label: '&Toggle Tables Drawer',
						accelerator: 'Ctrl+T',
						click: () => {
							this.mainWindow.webContents.send('TOGGLE_TABLES_DRAWER');
						}
					},
					{
						label: '&Toggle Query Bar',
						accelerator: 'Ctrl+F',
						click: () => {
							this.mainWindow.webContents.send('TOGGLE_QUERY_BAR');
						}
					},
					{
						label: '&Toggle Grid',
						accelerator: 'Ctrl+G',
						click: () => {
							this.mainWindow.webContents.send('TOGGLE_GRID');
						}
					},
					{
						label: '&Toggle Markers Drawer',
						accelerator: 'Ctrl+M',
						click: () => {
							this.mainWindow.webContents.send('TOGGLE_MARKER_DRAWER');
						}
					},
					{
						label: '&Toggle Road Creation Drawer',
						accelerator: 'Ctrl+R',
						click: () => {
							this.mainWindow.webContents.send('TOGGLE_ROADCREATION_DRAWER');
						}
					},
					{
						label: '&Reload',
						accelerator: 'Ctrl+P',
						click: () => {
							this.mainWindow.webContents.reload();
						}
					},
					{
						label: 'Toggle &Full Screen',
						accelerator: 'F11',
						click: () => {
							this.mainWindow.setFullScreen(!this.mainWindow.isFullScreen());
						}
					},
					{
						label: 'Toggle &Developer Tools',
						accelerator: 'Alt+Ctrl+I',
						click: () => {
							this.mainWindow.toggleDevTools();
						}
					}
				]
			},
			{
				label: 'Help',
				submenu: [
					{
						label: 'Learn More',
						click() {
							shell.openExternal(
								'https://www.youtube.com/watch?v=xmmsHtX6lkE&t=1s'
							);
						}
					}
				]
			}
		];
	}
}
