var _ = require("lodash");
var React = require("react/addons");
var CodeMirror = require("codemirror");

var KeyboardActions = require("editor/actions/KeyboardActions");

export default React.createClass({
  componentDidMount() {
    let myCodeMirror = CodeMirror(this.refs.editor.getDOMNode(), {
      lineNumbers: true,
      tabSize: 2,
      extraKeys: {
        Tab: function(cm) {
          let spaces = Array(cm.getOption("indentUnit") + 1).join(" ");
          cm.replaceSelection(spaces);
        },
        "Ctrl-[": KeyboardActions.ctrl_open_square_br,
        "Ctrl-]": KeyboardActions.ctrl_close_square_br,
        "Ctrl-p": KeyboardActions.ctrl_p,
        "Ctrl-r": KeyboardActions.ctrl_r,
        "Shift-Tab": "autocomplete"
      },
      value: this.props.initContent,
      mode: this.props.mode,
      theme: "solarized dark",
      indentWithTabs: false,
      viewportMargin: Infinity
    });

    myCodeMirror.on("change", _.throttle((CodeMirror, object) => {
      this.props.onChangeValue(myCodeMirror.getValue());
    }, 2000));

    this.setState({myCodeMirror: myCodeMirror});
  },

  componentDidUpdate(oldProps) {
    if (this.props.focus) {
      this.state.myCodeMirror.refresh();

      if (!oldProps.focus) {
        this.state.myCodeMirror.focus();
      }
    }

  },

  render() {
    return ( <div className={this.props.className} ref="editor"></div>);
  }
});
