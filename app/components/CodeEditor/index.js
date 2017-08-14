// @flow
/**
 * Created by chris on 8/8/2017.
 */
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import { injectGlobal } from 'styled-components';
import 'brace/mode/javascript';
import 'brace/ext/searchbox';
import 'brace/ext/language_tools';

import './aceEditorTheme';

class CodeEditor extends Component {
	ace: HTMLElement;
	props: {
		onChangeCodeEditor: any,
		value: string
	};

	render() {
		return (
			<AceEditor
				enableBasicAutocompletion
				enableLiveAutocompletion
				ref={r => {
					this.ace = r;
				}}
				value={this.props.value}
				width="100%"
				height="300px"
				mode="javascript"
				theme="dataFoundryTheme"
				onChange={this.props.onChangeCodeEditor}
				name="UNIQUE_ID_OF_DIV"
				editorProps={{ $blockScrolling: Infinity }}
			/>
		);
	}
}

injectGlobal`
  .ace_search {
    background-color: ${'orange'};
    color: ${'orange'};
    border: none;
    padding: 5px;
  }
  .ace_search_field {
    background-color: ${'orange'};
    color: ${'orange'};
  }
  .ace_searchbtn, .ace_replacebtn {
    background-color: ${'orange'};
    color: ${'orange'};
    border-left: none;
  }
  .ace_search_form {
    border: 1px solid ${'orange'};
  }
  .ace_replace_form {
    border: 1px solid ${'orange'};
  }
  .ace_button.checked {
    border-color: ${'orange'};
    opacity: 1;
  }
  .ace_button {
    color: ${'orange'}
  }
  .ace_searchbtn.next {
    	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAMAAABPT11nAAAABlBMVEX////N0dWiLwRoAAAAAXRSTlMAQObYZgAAABpJREFUeAFjYGBkYAATjIxIBJiGsBjAAEwDAAIBABWbqTWqAAAAAElFTkSuQmCC);
  }
  .ace_searchbtn.prev {
  	background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAMAAABPT11nAAAABlBMVEX////N0dWiLwRoAAAAAXRSTlMAQObYZgAAABlJREFUeAFjAAJGRiABooEAQkNYCAIizAAAAd0AFT3O9lkAAAAASUVORK5CYII=);
  }
`;

export default CodeEditor;
