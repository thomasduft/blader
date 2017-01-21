var gulp = require('gulp');
var config = require('../config')();
var less = require('gulp-less');
var watch = require('gulp-watch');
var path = require('path');

gulp.task('less', function () {
  var lessFile = config.assets.styles + 'app.less';
  return gulp.src(lessFile)
    .pipe(less())
    .pipe(gulp.dest(config.assets.styles));
});

gulp.task('watch-less', function () {
  var lessFile = config.assets.styles + '*.less';
  return gulp.src(lessFile)
    .pipe(watch(lessFile))
    .pipe(less())
    .pipe(gulp.dest(config.assets.styles));
});