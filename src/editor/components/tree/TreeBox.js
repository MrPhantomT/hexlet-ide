var React = require("react/addons");

var WatchStoreMixin = require("editor/mixins/WatchStore");

var Tree = require("./Tree");
var TreeStore = require("editor/stores/TreeStore");

var PopupActions = require("editor/actions/PopupActions");
var TreeActions = require("editor/actions/TreeActions");
import {
  showContextMenu,
  hideContextMenu
} from "editor/actions/ContextMenuActions";

var TreeBox = React.createClass({
  mixins: [ WatchStoreMixin(TreeStore) ],

  getFluxState() {
    return {
      tree: TreeStore.getRoot(),
    };
  },

  componentDidMount() {
    TreeActions.loadTree();
  },

  handleOpenCreateFolderModal(parentId) {
    PopupActions.open("create_folder", { parentId: parentId });
  },

  handleOpenCreateFileModal(parentId) {
    PopupActions.open("create_file", { parentId: parentId });
  },

  handleOpenRenameModal(item) {
    PopupActions.open("rename", { item: item });
  },

  handleOpenRemoveFolderModal(item) {
    PopupActions.open("remove_folder", { item: item });
  },

  handleOpenRemoveFileModal(item) {
    PopupActions.open("remove_file", { item: item });
  },

  handleRefreshTree() {
    TreeActions.loadTree();
    hideContextMenu();
  },

  getContextMenuItems(item) {
    var contextMenuChildren = [];

    contextMenuChildren.push([
        {onClick: this.handleRefreshTree.bind(this), title: "Refresh tree"},
    ]);
    if (item.type === "directory") {
      contextMenuChildren.push([
        {onClick: this.handleOpenCreateFolderModal.bind(this, item.id), title: "New folder"},
        {onClick: this.handleOpenCreateFileModal.bind(this, item.id), title: "New file"}
      ]);

      contextMenuChildren.push([
        {onClick: this.handleOpenRemoveFolderModal.bind(this, item), title: "Remove folder"},
        {onClick: this.handleOpenRenameModal.bind(this, item), title: "Rename"}
      ]);
    }

    if (item.type === "file") {
      contextMenuChildren.push([
        {onClick: this.handleOpenRemoveFileModal.bind(this, item), title: "Remove file"},
        {onClick: this.handleOpenRenameModal.bind(this, item), title: "Rename"}
      ]);
    }

    return contextMenuChildren;
  },

  handleContextMenu(e, item) {
    e.preventDefault();
    e.stopPropagation();
    const coords = {
      x: e.clientX,
      y: e.clientY
    };
    const items = this.getContextMenuItems(item);
    showContextMenu(coords, items);
  },

  render() {
    return (
      <div className="fuelux file-tree-box">
        <h3>Folders</h3>
        {this.state.tree ?
        <div className="tree">
          <ul role="tree">
            <Tree key={"tree_" + this.state.tree.id} tree={this.state.tree} handleContextMenu={this.handleContextMenu} />
          </ul>
        </div>
        : null}
      </div>
    );
  }
});

module.exports = TreeBox;
