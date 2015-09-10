var ConnectMincer = require("connect-mincer");

var connectMincer = new ConnectMincer({
  root: __dirname,
  production: process.env.NODE_ENV === "production",
  mountPoint: "/public/assets",
  manifestFile: __dirname + "/public/assets/manifest.json",
  paths: [
    "../editor/styles",
    "../../node_modules/escaper.js",
    "../../node_modules/codemirror",
    "../../bower_components/xterm.js"
  ]
});


module.exports = connectMincer;
