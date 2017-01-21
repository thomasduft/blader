(function (global) {
  var map = {
    'app': 'src/app',
    'rxjs': 'node_modules/rxjs',
    '@angular': 'node_modules/@angular'
  };

  var packages = {
    'app': { main: './main.js', defaultExtension: 'js' },
    'rxjs': { defaultExtension: 'js' },
  };

  var ngPackageNames = [
    'core',
    'common',
    'compiler',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router'
  ];
  ngPackageNames.forEach(function (pkgName) {
    map['@angular/' + pkgName] = 'node_modules/@angular/' + pkgName + '/bundles/' + pkgName + '.umd.js';
  });

  System.config({
    map: map,
    packages: packages
  });
})(this);
