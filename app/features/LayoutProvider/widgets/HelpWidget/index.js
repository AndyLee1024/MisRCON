// @flow
/**
 * Name: HelpWidget
 * Description: Renders markdown and displays the CVARHelpFile
 */
import React, { PureComponent } from 'react';
import marked from 'marked';
import helpString from '../../../../../CVARHelp.md';
import './darcula-markdown.global.css';

class HelpWidget extends PureComponent {
	render() {
		return (
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%',
					flexGrow: 1,
					overflow: 'auto',
					padding: '5px',
					boxSizing: ' border-box'
				}}
				className="markdown-body"
				dangerouslySetInnerHTML={{ __html: marked.parse(helpString) }}
			/>
		);
	}
}

export default HelpWidget;
