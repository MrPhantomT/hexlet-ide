const AppDispatcher = require("editor/dispatcher/AppDispatcher");
const ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

const FileSearchActions = require("./FileSearchActions");
const IdeActions = require("./FileSearchActions");

module.exports = {
  esc() {
    AppDispatcher.dispatch({ actionType: ActionTypes.KEY_ESC });
  },

  ctrl_r() {
    IdeActions.run();
  },

  ctrl_p() {
    FileSearchActions.open();
  },

  ctrl_open_square_br() {
    AppDispatcher.dispatch({ actionType: ActionTypes.KEY_CTRL_OPEN_SQUARE_BR });
  },

  ctrl_close_square_br() {
    AppDispatcher.dispatch({ actionType: ActionTypes.KEY_CTRL_CLOSE_SQUARE_BR });
  },
};
