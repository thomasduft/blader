var gulp = require('gulp');
var config = require('../config')();
var tslint = require('gulp-tslint');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var path = require('path');

/* Initialize TS Project */
var tsProject = ts.createProject(config.root + 'tsconfig.json');
var tsUnitFiles = [].concat(config.tsTestFiles.unit);
var tsFiles = [].concat(config.tsFiles, tsUnitFiles);

gulp.task('tsc-build', function () {
  return compileForProdTs(config.tsFiles, config.build.prod.app);
});

function compileForProdTs(files, tsOutDir) {
  var res = gulp.src(files, {
    base: config.src.app,
    outDir: tsOutDir
  })
    .pipe(tslint({
      formatter: 'verbose'
    }))
    .pipe(tslint.report())
    .pipe(tsProject())
    .on('error', function () {
      process.exit(1);
    });

  return res.js
    .pipe(gulp.dest(tsOutDir));
}