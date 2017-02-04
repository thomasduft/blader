import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SidebarComponent, WorkspaceComponent } from './shared/index';
import { AppService } from './app.service';
import {
  HomeComponent,
  ListComponent,
  DetailComponent,
  EntryComponent
} from './components/index';
import {
  BladerModule,
  BladeRegistryService,
  BladeMetaData
} from './blader/index';

const APP_ROUTES = RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent }
]);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    APP_ROUTES,
    BladerModule
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
    { provide: AppService, useClass: AppService }
  ]
})
export class AppModule {
  public constructor(
    private _bladeRegistry: BladeRegistryService
  ) {
    this._bladeRegistry.registerBlade(new BladeMetaData('entry', EntryComponent));
    this._bladeRegistry.registerBlade(new BladeMetaData('list', ListComponent));
    this._bladeRegistry.registerBlade(new BladeMetaData('detail', DetailComponent));
  }
}
