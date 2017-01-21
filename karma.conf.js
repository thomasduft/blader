// Karma configuration
// based on: https://github.com/mgechev/angular-seed
module.exports = function (config) {

  var appBase = 'src/app/';         // transpiled app JS and map files
  var appSrcBase = 'src/app/';      // app source TS files
  var appAssets = 'base/src/app/';  // component assets fetched by Angular's compiler

  // Testing helpers (optional) are conventionally in a folder called `testing`
  var testingSrcBase = 'testing/'; // test source TS files

  var cfg = {
    basePath: '',
    frameworks: ['jasmine'],

    client: {
      builtPaths: [appBase], // add more spec base paths as needed
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },

    // list of files / patterns to load in the browser
    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system-polyfills.js', // PhantomJS2 (and possibly others) might require it
      'node_modules/systemjs/dist/system.src.js',

      // Polyfills
      'node_modules/core-js/client/shim.js',

      // zone.js
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/fake-async-test.js',

      // RxJs.
      { pattern: 'node_modules/rxjs/**/*.js', included: false, watched: false },
      { pattern: 'node_modules/rxjs/**/*.js.map', included: false, watched: false },

      // paths loaded via module imports
      // Angular itself
      { pattern: 'node_modules/@angular/**/*.js', included: false, watched: true },
      { pattern: 'node_modules/@angular/**/*.js.map', included: false, watched: false },

      { pattern: 'src/systemjs.config.js', included: false, watched: false },
      'test.main.js',

      // transpiled application & spec code paths loaded via module imports
      { pattern: appBase + '**/*.js', included: false, watched: true },

      // Asset (HTML & CSS) paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      // { pattern: appBase + '**/*.html', included: false, watched: true },
      // { pattern: appBase + '**/*.css', included: false, watched: true },

      // Paths for debugging with source maps in dev tools
      { pattern: appSrcBase + '**/*.ts', included: false, watched: false },
      { pattern: appBase + '**/*.js.map', included: false, watched: false },
    ],

    // Proxied base paths for loading assets
    proxies: {
      // required for component assets fetched by Angular's compiler
      "/app/": appAssets
    },

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/app/**/!(*spec).js': ['coverage']
    },

    reporters: ['spec'],

    coverageReporter: {
      dir: 'dist/test/reports/',
      reporters: [
        { type: 'json', subdir: 'report-json' }
      ]
    },

    remapIstanbulReporter: {
      reports: {
        html: 'dist/test/reports/coverage'
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'], // 'Chrome', 'PhantomJS'
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  };

  var enableCoverage = config.enableCoverage || false;
  if (enableCoverage) {
    cfg.reporters = ['spec', 'coverage', 'karma-remap-istanbul'];
  }

  config.set(cfg);
}
