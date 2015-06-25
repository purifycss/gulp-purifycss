'use strict';

var path = require('path');
var glob = require('glob');
var purifycss = require('purify-css');
var gutil = require('gulp-util');
var fs = require('fs');
var File = gutil.File;
var through = require('through2');
var PluginError = require('gulp-util').PluginError;

var defaultOptions = { 
  write: false, // Let gulp take care of writing the file 
  minify: false // Everyone loves minification
};

const PLUGIN_NAME = 'gulp-purifycss';

module.exports = function(sources, filename, options) {
  if(typeof options === 'undefined') {
    options = filename;
  }

  // default options
  options = options || defaultOptions;

  if(options.output) {
    filename = options.output;
  }

  var sourceFiles = [];
  var sourceContents = [];
  var totalLength = 0;

  // we'll need sources to make this work
  if(!sources) {
    throw new PluginError(PLUGIN_NAME, 'Missing input sources - You need to have a string or array of strings for the source');
  }

  // we'll need an output filename
  if(!filename) {
    throw new PluginError(PLUGIN_NAME, 'Missing output file name');
  }

  if(typeof filename !== 'string') {
    throw new PluginError(PLUGIN_NAME, 'Invalid file name');
  }

  sources.forEach(function(pathPattern) {
    var files = glob.sync(pathPattern);
    sourceFiles = sourceFiles.concat(files);
  });

  if(!sourceFiles.length) {
    throw new PluginError(PLUGIN_NAME, 'Missing input sources - Glob failed to recognize your strings');
  }

  sourceFiles.forEach(function(sourcePath) {
    var file = fs.readFileSync(sourcePath);
    var fileLength = file.length;
    if(fileLength > 0) {
      totalLength += fileLength;
      sourceContents.push(file);
    }
  });

  if(!sourceContents.length) {
    throw new PluginError(PLUGIN_NAME, 'Missing input sources - Files do not exist');
  }
  
  var source = Buffer.concat(sourceContents, totalLength);

  var bufferFiles = through.obj(function(file, enc, cb) {
    var that = this;

    if(file.isNull()) {
      return cb();
    }

    if(file.isStream()) {
      var css = '';
      file.on('readable', function(buffer) {
        var part = buffer.read().toString();
        css += part;
      });

      file.on('end', function() {
        try {
          purifycss(source.toString(), css, options, function(output) {
            file.contents = new Buffer(output);
            cb(null, file);
          });
        } catch(error) {
          that.emit('error', new PluginError(PLUGIN_NAME, error));
          return cb(error);
        }
      })
    } else if(file.isBuffer()) {

      try {
        // run the voodoo magick
        purifycss(file.contents.toString(), source.toString(), options, function(output) {
          if(typeof output === 'string') {

            // Turn that string into a buffer
            var fileObj = new File({ 
              contents: new Buffer(output, output.length),
              basename: filename,
              path: path.join('./', filename)
            });

            that.push(fileObj);
            return cb(null, fileObj);
          }

          // They might have specified in the options for purifycss to save the file. Deal with it.
          // Or, we don't recognize the output due to the options given to the plugin

          return cb();
        });
      } catch(error) {
        that.emit('error', new PluginError(PLUGIN_NAME, error));
        return cb(error);
      }
    }

  });

  return bufferFiles;
};