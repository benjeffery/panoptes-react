var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var config = require('../config').browserify;

watchify.args.debug = config.debug;
watchify.args.paths = ['./src/js', './src/js/components'];
var bundler = watchify(browserify(config.src, watchify.args));
config.settings.transform.forEach(function(t) {
  bundler.transform(t);
});

gulp.task('browserify', bundle);
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  //.pipe(buffer())
  //.pipe(sourcemaps.init({loadMaps: true}))
  //.pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.dest))
  .pipe(connect.reload());
}
