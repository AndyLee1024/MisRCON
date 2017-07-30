// @flow
/**
 * Name: theme
 * Description:
 */
import { injectGlobal } from 'styled-components';

const addGlobalStyling = () => {
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

export default addGlobalStyling;
