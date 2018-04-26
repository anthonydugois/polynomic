import { default as React, Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";

import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/selection/active-line";

class Editor extends Component {
  static defaultProps = {
    options: {
      mode: "javascript",
      tabSize: 2,
      indentWithTabs: true,
      lineNumbers: true,
      lineWrapping: true,
      showCursorWhenSelecting: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      styleActiveLine: true,
    },
  };

  handleChange = (editor, data, value) => {
    const { onChange } = this.props;

    onChange(value);
  };

  render() {
    const { value, options } = this.props;

    return (
      <CodeMirror
        value={value}
        options={options}
        onBeforeChange={this.handleChange}
      />
    );
  }
}

export default Editor;
