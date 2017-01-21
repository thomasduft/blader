var gulp = require('gulp');
var config = require('../config')();
var del = require('del');

gulp.task('clean', function () {
  return del([
    config.app + '**/*.js',
    config.app + '**/*.js.map',
    config.app + '**/*.d.ts',
    config.app + '**/*.metadata.json',
    config.assets.styles + '*.css',
    config.dist,
    '*.ts',
    '*.map',
    '*.js',
    '!gulpfile.js',
    '!karma.conf.js',
    '!test.main.js'
  ]);
});
