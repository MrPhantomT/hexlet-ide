const AppDispatcher = require("editor/dispatcher/AppDispatcher");
const ActionTypes = require("editor/constants/IdeConstants").ActionTypes;

var rpc = require("editor/lib/RpcClient");

module.exports = {
  open() {
    rpc.getClient().fs.filesList().then(function(result) {
      AppDispatcher.dispatch({
        actionType: ActionTypes.FILE_SEARCH_OPEN,
        files: result.files
      });
    });
  },

  changeFilter(pattern) {
    // rpc.getClient().fs.filesList(pattern).then(function(result) {
    //   AppDispatcher.dispatch({
    //     actionType: ActionTypes.FILE_SEARCH_CHANGE_FILTER,
    //     files: result.files
    //   });
    // });
  }
};

