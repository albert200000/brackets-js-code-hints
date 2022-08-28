/*eslint-env node */
/*jslint node: true */

"use strict";

var fs = require("fs");
var path = require("path");
var fpath = path.resolve(__dirname, "node_modules", "acorn", "dist", "acorn_loose.js");
var content = fs.readFileSync(fpath, "utf8");
content = content.replace(/'\.\/acorn\.js'/g, "'./acorn'");
fs.writeFileSync(fpath, content, "utf8");
