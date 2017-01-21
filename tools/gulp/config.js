module.exports = function () {
  var name = 'starter';
  var root = '';
  var src = root + 'src/';
  var app = src + 'app/';
  var dist = 'dist/';
  var htmlFiles = [
    app + '**/*.html'
  ];
  var tsFiles = [
    app + '**/!(*.spec)+(.ts)'
  ];
  var tsTestFiles = {
    unit: [app + '**/*.spec.ts']
  };
  var build = {
    test: {
      path: 'dist/test/',
      app: 'dist/test/app/'
    },
    prod: {
      path: 'dist/prod/',
      app: 'dist/prod/app/'
    }
  };
  var report = {
    path: 'dist/test/report/'
  };
  var assets = {
    path: src + 'assets/',
    styles: src + 'assets/styles/',
    i18n: src + 'assets/i18n/'
  };
  var docs = 'dist/docs/';

  var config = {
    name: name,
    root: root,
    src: src,
    dist: dist,
    app: app,
    htmlFiles: htmlFiles,
    build: build,
    tsFiles: tsFiles,
    tsTestFiles: tsTestFiles,
    report: report,
    assets: assets,
    docs: docs
  };

  return config;
};
