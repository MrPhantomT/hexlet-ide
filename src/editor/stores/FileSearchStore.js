/* global require module */
var AppDispatcher = require("editor/dispatcher/AppDispatcher");
var BaseStore = require("./BaseStore");
var ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var state = {
  isOpened: false,
  files: [],
  searchText: "",
};

function close(state) {
  state.isOpened = false;
  return state;
}

function open(state) {
  state.isOpened = open;
  return state;
}


const FileSearchStore = BaseStore.extend({
  getFiles() {
    return state.files;
  },

  isOpened() {
    return state.isOpened;
  }
});

AppDispatcher.registerHandler(ActionTypes.FILE_SEARCH_OPEN, function(payload) {
  state = open(state);
  state.files = payload.files;
  FileSearchStore.emitChange();
});

AppDispatcher.registerHandler(ActionTypes.TREE_OPEN_FILE, function(payload) {
  if (state.isOpened) {
    state = close(state);

    FileSearchStore.emitChange();
  }
});

AppDispatcher.registerHandler(ActionTypes.KEY_ESC, function(payload) {
  if (state.isOpened) {
    state = close(state);

    FileSearchStore.emitChange();
  }
});

module.exports = FileSearchStore;
