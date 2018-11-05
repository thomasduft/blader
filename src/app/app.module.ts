import { NgModule, Injector, ComponentFactoryResolver } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

const APP_ROUTES = RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' }
], { preloadingStrategy: PreloadAllModules });

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    BladerModule,
    APP_ROUTES
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
  bootstrap: [AppComponent]
})
export class AppModule {
  public constructor(
    private _bladeRegistry: BladeRegistry,
    private _injector: Injector
  ) {
    this._bladeRegistry.register(new BladeMetaData('entry', EntryComponent, () => {
      const resolver = this._injector.get(ComponentFactoryResolver);
      return resolver.resolveComponentFactory(EntryComponent);
    }));

    this._bladeRegistry.register(new BladeMetaData('list', ListComponent, () => {
      const resolver = this._injector.get(ComponentFactoryResolver);
      return resolver.resolveComponentFactory(ListComponent);
    }));

    this._bladeRegistry.register(new BladeMetaData('detail', DetailComponent, () => {
      const resolver = this._injector.get(ComponentFactoryResolver);
      return resolver.resolveComponentFactory(DetailComponent);
    }));
  }
}
