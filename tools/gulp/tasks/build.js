var gulp = require('gulp');
var config = require('../config')();
var runSequence = require('run-sequence');
var Builder = require('systemjs-builder');

gulp.task('build', function (done) {
  runSequence(
    'clean',
    'tsc-build',
    'bundle',
    'i18n',
    'styles',
    done);
});

// assets
gulp.task('i18n', function () {
  return gulp.src(config.assets.i18n + '*.xlf')
    .pipe(gulp.dest(config.build.prod.path + 'assets/i18n/'));
});
gulp.task('styles', ['less'], function () {
  return gulp.src(config.assets.styles + '*.css')
    .pipe(gulp.dest(config.build.prod.path + 'assets/styles/'));
});

// bundle
gulp.task('bundle', function () {
  const ANGULAR_BUNDLES = [
    '@angular/core',
    '@angular/compiler',
    '@angular/common',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router'
  ].join(' - ');

  return createBundle(ANGULAR_BUNDLES);
});
function createBundle(angularBundles) {
  // single step
  var barrelName = 'app/*';
  var barrelPath = config.build.prod.app + '*.js';

  var builderConfig = {
    defaultJSExtensions: true,
    format: 'cjs',
    paths: {
      'rxjs/*': 'node_modules/rxjs/*',
      '@angular/*': 'node_modules/@angular/*'
    },
    packages: {
      'app': {
        main: 'main.js',
        defaultExtension: 'js'
      },
      '@angular/core': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/compiler': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/common': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/http': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      '@angular/router': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        main: 'Rx.js',
        defaultExtension: 'js'
      }
    }
  }
  builderConfig.paths[barrelName] = barrelPath;

  var expressionOrTree = barrelName + ' - rxjs - ' + angularBundles;
  var outFile = config.build.prod.path + 'libs/app.cjs.js';
  var minOutFile = config.build.prod.path + 'libs/app.cjs.min.js';

  // 3. bundle
  bundle(builderConfig, expressionOrTree, outFile, { minify: false, sourceMaps: false });
  return bundle(builderConfig, expressionOrTree, minOutFile, { minify: true, sourceMaps: false });
}
function bundle(builderConfig, expressionOrTree, outFile, bundleOptions) {
  var builder = new Builder(builderConfig);
  return builder.bundle(expressionOrTree, outFile, bundleOptions);
}
