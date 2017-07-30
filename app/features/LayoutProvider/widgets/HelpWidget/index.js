// @flow
/**
 * Name: HelpWidget
 * Description: Renders markdown and displays the CVARHelpFile
 */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import marked from 'marked';
import helpString from '../../../../../CVARHelp.md';
import './darcula-markdown.global.css';

class HelpWidget extends PureComponent {
	render() {
		return (
			<Container
				className="markdown-body"
				dangerouslySetInnerHTML={{ __html: marked.parse(helpString) }}
			/>
		);
	}
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	flex-grow: 1;
	overflow: auto;
	padding: 5px;
	box-sizing: border-box;
`;

export default HelpWidget;
