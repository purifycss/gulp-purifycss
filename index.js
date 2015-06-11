'use strict';

var through = require('through');
var path = require('path');
var glob = require('glob');
var purify = require('purify-css');
var gutil = require('gulp-util');
var fs = require('fs');
var File = gutil.File;

const PLUGIN_NAME = 'gulp-purifycss';

module.exports = function(source, styles, options) {

  var sourceFiles = [];
  source.forEach(function(pathPattern) {
    var files = glob.sync(pathPattern);
    console.log("Source Files: ", files);
    sourceFiles = sourceFiles.concat(files);
  });
  if (!sourceFiles.length) {
    throw new PluginError('gulp-purifycss', 'Missing source files for gulp-purifycss');
  }

  var styleFiles = [];
  styleFiles.forEach(function(pathPattern) {
    var style = glob.sync(pathPattern);
    console.log("Style Files: ", style);
    styleFiles = styleFiles.concat(style);
  });
  if (!styleFiles.length) {
    throw new PluginError('gulp-purifycss', 'Missing style files for gulp-purifycss');
  }

  var pure = purify(src, styles, {write: false, info: true});

  fs.writeFile('./tmp/new.css', pure, 'utf8', function(err) {
    if (err) throw err;
  });
  return through.obj();
};