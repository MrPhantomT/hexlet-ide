var React = require("react/addons");

var TreeBox = require("editor/components/tree/TreeBox");
var EditorsBox = require("editor/components/editors/EditorsBox");
var TerminalsBox = require("editor/components/terminals/TerminalsBox");
var ContextMenu = require("editor/components/common/ContextMenu");
var Loader = require("editor/components/common/Loader");
var RunnerBox = require("editor/components/RunnerBox");
var ActionsBox = require("editor/components/ActionsBox");
var StatusBox = require("editor/components/StatusBox");
var PopupBox = require("editor/components/PopupBox");
var FileSearch = require("editor/components/file_search/FileSearch");

var IdeActions = require("editor/actions/IdeActions");
var WatchStoreMixin = require("editor/mixins/WatchStore");
var IdeStore = require("editor/stores/IdeStore");

var Panel = require("./common/split/Panel");
var VerticalSplit = require("./common/split/VerticalSplit");
var HorizontalSplit = require("./common/split/HorizontalSplit");

var Ide = React.createClass({
  mixins: [WatchStoreMixin(IdeStore)],
  getFluxState: function() {
    return IdeStore.getState();
  },

  handleGlobalClick: function() {
    IdeActions.globalClick();
  },

  renderDisplayMode(mode) {
    switch(mode) {
      case "normal":
        return this.renderNormalMode();
      case "terminal":
        return this.renderTerminalMode();
    }
  },

  renderNormalMode() {
    return <div className="splits-container" onClick={this.handleGlobalClick}>
      <VerticalSplit className="ide-split">
        <Panel className="left-panel">
          <TreeBox />
        </Panel>
        <Panel className="right-panel">
          <HorizontalSplit className="editor-split">
            <Panel className="top-panel">
              <EditorsBox />
            </Panel>
            <Panel className="bottom-panel">
              <TerminalsBox />
            </Panel>
          </HorizontalSplit>
        </Panel>
      </VerticalSplit>
    </div>
  },

  renderTerminalMode() {
    return <div className="splits-container" onClick={this.handleGlobalClick}>
      <TerminalsBox />
    </div>
  },

  render: function() {
    if (!this.state.loaded) {
      return <Loader />;
    }

    const displayMode = this.state.displayMode;

    return (
      <div className="ide-inner">
        <PopupBox />
        <ContextMenu />
        <FileSearch />
        {this.renderDisplayMode(displayMode)}
      </div>
    );
  }
});

module.exports = Ide;
