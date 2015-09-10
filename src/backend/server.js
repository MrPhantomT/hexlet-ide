var fs = require("fs");
var path = require("path");
var express = require("express");
var morgan = require("morgan");
var http = require("http");
var socketIOFactory = require("socket.io");
var rpcFactory = require("./rpc");
var connectMincer = require("./mincer.js");

var routes = require("./routes/index");

module.exports = function(options) {
  var app = express();
  app.use(morgan("combined"));
  app.use(connectMincer.assets());
  if (process.env.NODE_ENV !== 'production') {
    app.use('/public/assets', connectMincer.createServer());
  }
  app.engine("jade", require("jade").__express);

  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  var server = http.createServer(app);
  server.listen(options.port);
  console.log("info: starting on port '" + options.port + "'");

  var io = socketIOFactory(server);
  // TODO it might make sense to do rpc calls timeouts on the client side
  io.set("heartbeat timeout", 5000);
  io.set("heartbeat interval", 3000);
  rpcFactory(io, options);

  app.use("/", routes);

  if (process.env.NODE_ENV === "develop" || process.env.NODE_ENV === "test") {
    require("express-debug")(app, {
      panels: ["locals", "request", "session", "template", "nav"]
    });

    var webpack = require("webpack");
    var webpackConfig = require("../../webpack.config.js")();
    var compiler = webpack(webpackConfig);

    var webpackDevMiddleware = require("webpack-dev-middleware");
    var middleware = webpackDevMiddleware(compiler, webpackConfig.devServer);
    app.use(middleware);
  }
  app.use(express.static(path.join(__dirname, "public")));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get("env") === "development") {
    app.use(function(err, req, res) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });

  return server;
};
