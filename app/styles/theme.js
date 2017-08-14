// @flow
/**
 * Name: theme
 * Description:
 */
import { injectGlobal } from 'styled-components';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';

import { white, orange, lightBlue, midBlue, midText } from './colors';

export const addGlobalStyling = () => {
	injectGlobal`
	::-webkit-scrollbar {
		width: 0.7em;
	}
	
	::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px ${midBlue};
	}
	
	::-webkit-scrollbar-thumb {
		background: ${lightBlue};
	}
	
	::-webkit-scrollbar-corner,
	::-webkit-scrollbar-thumb:window-inactive {
		background: ${midBlue};
	}
`;
};

export const MisRCONTheme = getMuiTheme({
	tooltip: {
		color: midText,
		rippleBackgroundColor: midBlue
	},
	spacing,
	fontFamily: 'Roboto, sans-serif',
	borderRadius: 2,
	palette: {
		primary1Color: orange,
		primary2Color: midBlue,
		primary3Color: lightBlue,
		accent1Color: lightBlue,
		accent2Color: orange,
		accent3Color: orange,
		textColor: white,
		secondaryTextColor: white,
		alternateTextColor: white,
		canvasColor: midBlue,
		borderColor: midBlue,
		disabledColor: lightBlue,
		pickerHeaderColor: orange,
		clockCircleColor: lightBlue
	}
});
