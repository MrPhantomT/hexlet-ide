import _ from "lodash";
import React, { Component } from "react/addons";
import CodeMirror from "codemirror";

import KeyboardActions from "editor/actions/KeyboardActions";

export default class extends Component {
  componentDidMount() {
    const { initContent, mode, onChangeValue } = this.props;
    const editorEl = React.findDOMNode(this.refs.editor);

    const editor = CodeMirror(editorEl, {
      lineNumbers: true,
      extraKeys: {
        "Ctrl-[": KeyboardActions.ctrl_open_square_br,
        "Ctrl-]": KeyboardActions.ctrl_close_square_br,
        "Shift-Tab": "autocomplete"
      },
      value: initContent,
      mode: mode,
      theme: "solarized dark",
      indentWithTabs: false,
      viewportMargin: Infinity
    });

    editor.on("change", _.throttle((CodeMirror, object) => {
      onChangeValue(myCodeMirror.getValue());
    }, 2000));

    this.setState({ editor: editor });
  }

  componentDidUpdate(oldProps) {
    if (this.props.focus) {
      this.state.editor.refresh();

      if (!oldProps.focus) {
        this.state.editor.focus();
      }
    }

  }

  render() {
    return ( <div className={this.props.className} ref="editor"></div>);
  }
}
