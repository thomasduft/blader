var gulp = require('gulp'),
    requireDir = require('require-dir'),
    tasks = requireDir('./tools/gulp/tasks');

gulp.task('default', ['bundle']);