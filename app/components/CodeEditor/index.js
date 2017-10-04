// @flow
/**
 * Created by chris on 8/8/2017.
 */
import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/ext/searchbox';
import 'brace/ext/language_tools';

import './aceEditorTheme';
import './codeEditor.global.css';

class CodeEditor extends Component {
  props: {
    onChangeCodeEditor: any,
    value: string
  };
  ace: HTMLElement;

  render() {
    return (
      <div style={{ marginBottom: 15 }}>
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
      </div>
    );
  }
}

export default CodeEditor;
