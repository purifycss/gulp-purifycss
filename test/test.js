require('mocha');
var purifycss = require('../index.js');
var should = require('should');
var assert = require('assert');
var sassert = require('stream-assert');
var gulp = require('gulp');
var fs = require('fs');
var File = require('gulp-util').File;
var PluginError = require('gulp-util').PluginError;

var srcFiles = ['test/examples/*.js', 'test/examples/*.html'];
var cssFiles = ['test/examples/*.css'];

var options = {};

function getFile(filepath) {
  var data = fs.readFileSync(filepath);
  var file = new File({
    contents: data,
    cwd: './test/',
    base: './'+filepath,
    path: filepath
  });

  return file;
};

describe('gulp-purifycss', function() {

  after(function(done) {
    fs.unlink('./test/test.css', function(ok) {
      fs.unlink('./test.css', function(ok) {
        done();
      }); 
    }); 
  });

  it('should throw when source files are missing', function() {
    assert.throws(function() {
      purifycss();
    }, PluginError);
  });

  it('should throw when source css files are missing', function() {
    assert.throws(function() {
      gulp.src(srcFiles)
      .pipe(purifycss());
    }, PluginError);
  });

  it('should throw an error if no file name is present or invalid', function() {
    assert.throws(function() {
      gulp.src(srcFiles)
      .pipe(purifycss(cssFiles));
    }, PluginError);
  });

  it('should support default file saving feature of purifycss', function(done) {
    gulp.src(srcFiles)
      .pipe(purifycss(cssFiles, { output: 'test.css' }))
      .pipe(sassert.length(1))
      .pipe(sassert.end(done));
  });
  
});