import { NgModule, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent, WorkspaceComponent } from './shared/index';
import {
  HomeComponent,
  ListComponent,
  DetailComponent,
  EntryComponent
} from './components/index';
import {
  BladerModule,
  BladeRegistry,
  BladeMetaData
} from './blader/index';

// -- MODULES IMPORT REGION
// import { LazyModule } from './lazy/index';
// -- END MODULES IMPORT REGION

const APP_ROUTES = RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'lazy', loadChildren: 'app/lazy/lazy.module#LazyModule' },
], { preloadingStrategy: PreloadAllModules });

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    APP_ROUTES,
    BladerModule.forRoot(),
    // -- MODULES REGION
    // LazyModule
    // -- END MODULES
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkspaceComponent,
    HomeComponent,
    EntryComponent,
    ListComponent,
    DetailComponent
  ],
  entryComponents: [
    EntryComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    RESOURCE_CACHE_PROVIDER,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    SystemJsNgModuleLoader
  ]
})
export class AppModule {
  public constructor(
    private _bladeRegistry: BladeRegistry
  ) {
    this._bladeRegistry.register(new BladeMetaData('entry', EntryComponent));
    this._bladeRegistry.register(new BladeMetaData('list', ListComponent));
    this._bladeRegistry.register(new BladeMetaData('detail', DetailComponent));
  }
}
