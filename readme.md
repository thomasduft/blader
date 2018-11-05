# blader
Playground for azure portal like blade controls made with angular.

### Lazy blades
If you want to use a blade in a lazy loaded module you need to configure the app.module with an appropriate `PreloadingStrategy`.

```typescript
const APP_ROUTES = RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' }
], { preloadingStrategy: PreloadAllModules });
``` 

In your lazy loaded module you need to register the blade with a factory function. This is required so the injector mechanism of angular knows where to look for its dependencies.

```typescript
export class LazyModule {
  public constructor(
    private _bladeRegistry: BladeRegistry,
    private _injector: Injector
  ) {
    console.log(`registering LazyBladeComponent...`);

    this._bladeRegistry.register(new BladeMetaData('lazy', LazyBladeComponent, () => {
      return this._injector
        .get(ComponentFactoryResolver)
        .resolveComponentFactory(LazyBladeComponent);
    }));

    console.log(this._bladeRegistry);
  }
}
```
