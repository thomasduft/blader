# blader
Playground for azure portal like blade controls made with angular.

![Blader](/blader.gif)

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
