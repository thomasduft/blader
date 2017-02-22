import 'rxjs/Rx';

// import { SystemJsNgModuleLoader, ApplicationInitStatus } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';


platformBrowserDynamic().bootstrapModule(AppModule);

/*
  .then(appModule => {
  modules.map(module => bootstrapComponent(module, appModule));
});

const modules = [
  'app/lazy/lazy.module#LazyModule'
];

function bootstrapComponent(module: string, appModule: any) {
  const loader = appModule.injector.get(SystemJsNgModuleLoader);
  return loader.load(module)
    .then((factory: any) => {
      const ngModule = factory.create(appModule.injector);
      let initStatus = ngModule.injector.get(ApplicationInitStatus);

      initStatus.donePromise.then(() => {
        console.log(`${module} is initialized...`);
      });
    });
}
*/
