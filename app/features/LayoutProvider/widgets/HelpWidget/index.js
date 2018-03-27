// @flow
/**
 * Name: HelpWidget
 * Description: Renders markdown and displays the CVARHelpFile
 */
import React, { Component } from 'react';
import axios from 'axios';
import marked from 'marked';
import './darcula-markdown.global.css';

class HelpWidget extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      helpString: ''
    };
  }

  async componentDidMount() {
    const helpString = await axios.get(
      'https://gist.githubusercontent.com/csprance/8599e46529853d206b5b7b181212ee83/raw/6853d6f6833a642e5e086e0d22c5055dfd2a689c/MiscreatedCVARHelp.md'
    );
    this.setState({
      helpString: helpString.data
    });
  }

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
        dangerouslySetInnerHTML={{
          __html: marked.parse(this.state.helpString)
        }}
      />
    );
  }
}

export default HelpWidget;
