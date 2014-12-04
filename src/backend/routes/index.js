/* global require module */

var express = require("express");

var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  "use strict";
  res.render("index", {});
});

module.exports = router;
