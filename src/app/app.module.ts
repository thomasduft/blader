import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) }
], { preloadingStrategy: PreloadAllModules });

@NgModule({
  imports: [
    BrowserModule,
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
  bootstrap: [AppComponent]
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
