// @flow
/**
 * Name: theme
 * Description:
 */
import { injectGlobal } from 'styled-components';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
	cyan700,
	grey600,
	pinkA100,
	fullWhite
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

import { grey, orange, white } from './colors';

export const addGlobalStyling = () => {
	injectGlobal`
	::-webkit-scrollbar {
		width: 12px;
		height: 8px;
		background-color: inherit;
	}
	::-webkit-scrollbar-thumb {
		-webkit-border-radius: 10px;
		border: 2px solid #2c2c2c;
		background-color: #404040;
	}
	::-webkit-scrollbar-track {
		width: 12px;
		height: 8px;
		background-color: #2c2c2c;
	}
	::-webkit-scrollbar-corner { 
		background: #2c2c2c; 
	}
`;
};

export const MisRCONTheme = getMuiTheme({
	spacing,
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: grey,
		primary2Color: cyan700,
		primary3Color: grey600,
		accent1Color: orange,
		accent2Color: '#65b8ff',
		accent3Color: pinkA100,
		textColor: white,
		secondaryTextColor: fade(fullWhite, 0.7),
		alternateTextColor: '#ffffff',
		canvasColor: '#303030',
		borderColor: fade(fullWhite, 0.3),
		disabledColor: fade(fullWhite, 0.3),
		pickerHeaderColor: fade(fullWhite, 0.12),
		clockCircleColor: fade(fullWhite, 0.12)
	}
});
