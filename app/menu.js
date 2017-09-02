// @flow
import { app, Menu, shell, BrowserWindow, remote } from 'electron';

export default class MenuBuilder {
	mainWindow: BrowserWindow;

	constructor(mainWindow: BrowserWindow) {
		this.mainWindow = mainWindow;
	}

	buildMenu() {
		if (
			process.env.NODE_ENV === 'development' ||
			process.env.DEBUG_PROD === 'true'
		) {
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
		// Open Dev tools window on App Start
		this.mainWindow.openDevTools();
	}

	buildDarwinTemplate() {
		const subMenuAbout = {
			label: 'Electron',
			submenu: [
				{
					label: 'Hide MisRCON',
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
					label: 'Documentation',
					click() {
						shell.openExternal('https://github.com/csprance/MisRCON');
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
						label: '&New Server',
						accelerator: 'Ctrl+N',
						click: () => {
							this.mainWindow.webContents.send('NEW_SERVER_CLICKED')
						}
					},
					{
						label: '&Quit',
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
						label: '&Reload',
						accelerator: 'Ctrl+R',
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
						label: 'Documentation',
						click() {
							shell.openExternal('https://github.com/csprance/MisRCON');
						}
					}
				]
			}
		];
	}
}
