import {
  EmulatorState,
  HistoryKeyboardPlugin
} from 'async-javascript-terminal';
import * as React from 'react';
import { ThemeProvider } from 'styled-components';

import CommandInput from './input/CommandInput';
import defaultRenderers from './output/index';
import OutputList from './OutputList';
import TerminalContainer from './TerminalContainer';
import defaultTheme from './themes/default';

type State = {
  emulatorState: any;
  inputStr: any;
  disabled: boolean;
};
type Props = {
  emulator: any;
  theme: any;
  promptSymbol: string;
  outputRenderers: any;
  emulatorState: any;
  inputStr: string;
};
class Terminal extends React.Component<Props, State> {
  static defaultProps = {
    emulatorState: EmulatorState.createEmpty(),
    theme: defaultTheme,
    promptSymbol: '🎮',
    outputRenderers: defaultRenderers,
    inputStr: ''
  };

  emulator: any;
  historyKeyboardPlugin: any;
  plugins: any[];
  inputRef: any;

  constructor(props: Props) {
    super(props);
    this.emulator = this.props.emulator;
    this.historyKeyboardPlugin = new HistoryKeyboardPlugin(
      this.props.emulatorState
    );
    this.plugins = [this.historyKeyboardPlugin];
    this.state = {
      disabled: false,
      emulatorState: this.props.emulatorState,
      inputStr: this.props.inputStr
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onInputKeyDownEvent = this.onInputKeyDownEvent.bind(this);
  }

  shouldComponentUpdate(state: any, nextState: any) {
    if (state.disabled !== nextState.disabled) {
      return true;
    }
    const isOutputEqual =
      this.state.emulatorState.getOutputs() ===
      nextState.emulatorState.getOutputs();
    const isInputStrEqual = this.state.inputStr === nextState.inputStr;

    return !isOutputEqual || !isInputStrEqual;
  }

  componentDidUpdate() {
    if (this.inputRef) {
      this.inputRef.scrollIntoView();
    }
  }

  async onInputSubmit(commandStr: string) {
    if (!this.state.disabled) {
      this.setState({
        disabled: true
      });

      const newState = await this.emulator.execute(
        this.state.emulatorState,
        commandStr,
        this.plugins
      );

      this.setState(({ emulatorState, ...rest }) => ({
        ...rest,
        inputStr: '',
        emulatorState: newState
      }));
      this.setState({
        disabled: false
      });
      this.inputRef.focus();
    }
  }

  onInputChange(e: any) {
    this.setState(({ inputStr, ...rest }) => ({
      ...rest,
      inputStr: e.target.value
    }));
  }

  onInputKeyDownEvent(e: any) {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();

        this.setState(({ inputStr, ...rest }) => ({
          ...rest,
          inputStr: this.historyKeyboardPlugin.completeUp()
        }));

        break;
      case 'ArrowDown':
        e.preventDefault();

        this.setState(({ inputStr, ...rest }) => ({
          ...rest,
          inputStr: this.historyKeyboardPlugin.completeDown()
        }));

        break;
      case 'Tab':
        e.preventDefault();

        const autoCompletedStr = this.emulator.autocomplete(
          this.state.emulatorState,
          this.state.inputStr
        );

        this.setState(({ inputStr, ...rest }) => ({
          ...rest,
          inputStr: autoCompletedStr
        }));

        break;
      default:
        break;
    }
  }

  render() {
    const { disabled } = this.state;
    const { theme, promptSymbol, outputRenderers } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <TerminalContainer className={'terminalContainer'}>
          <OutputList
            promptSymbol={promptSymbol}
            outputRenderers={outputRenderers}
            outputs={this.state.emulatorState.getOutputs()}
          />

          <CommandInput
            disabled={disabled}
            ref={inputRef => {
              this.inputRef = inputRef;
            }}
            promptSymbol={promptSymbol}
            value={this.state.inputStr}
            onSubmit={this.onInputSubmit}
            onKeyDown={this.onInputKeyDownEvent}
            onChange={this.onInputChange}
          />
        </TerminalContainer>
      </ThemeProvider>
    );
  }
}

export default Terminal;