/* global module require window */

var io = require("socket.io-client");

var Config = require("editor/config");

var rpc = require("../rpc");

var socket = io.connect(Config.url);

module.exports = rpc.createClient(socket);
