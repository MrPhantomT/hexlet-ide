var _ = require("lodash");
var fuzzy = require("fuzzy");
var React = require("react/addons");
var TreeActions = require("editor/actions/TreeActions");
var FileSearchActions = require("editor/actions/FileSearchActions");
var FileSearchStore = require("editor/stores/FileSearchStore");
var WatchStoreMixin = require("editor/mixins/WatchStore");

var Select = require('react-select');

export default React.createClass({
  mixins: [WatchStoreMixin(FileSearchStore)],

  getFluxState() {
    return {
      isOpened: FileSearchStore.isOpened(),
      files: FileSearchStore.getFiles(),
    };
  },

  componentDidUpdate() {
    if (this.state.isOpened) {
      this.refs.select.getInputNode().focus();
    }
  },

  render() {
    if (!this.state.isOpened) { return null; }

    return <div className="modal fade in" style={{ display: "block" }}>
      <div className="modal-dialog width-500">
        <Select ref="select" options={this.state.files} filterOptions={this.filterOptions} onChange={this.handleFilterChange} />
      </div>
    </div>
  },

  filterOptions(options, filterValue, _exclude) {
    if (filterValue == "") {
      return options;
    }
    return options.filter(function(opt) {
      return fuzzy.test(filterValue, opt.value);
    });
  },

  handleFilterChange(file, options) {
    TreeActions.openFile(options[0].data);
  }
});

