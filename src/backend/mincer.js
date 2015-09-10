var ConnectMincer = require("connect-mincer");

var connectMincer = new ConnectMincer({
  root: __dirname,
  production: false,
  mountPoint: '/public/assets',
  manifestFile: __dirname + '/public/assets/manifest.json',
  paths: [
    '../editor/styles',
    '../../node_modules',
    '../../bower_components'
  ]
});


module.exports = connectMincer;
