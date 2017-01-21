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
  HostComponent
} from './components/index';
import { BladeComponent } from './blades/index';

const APP_ROUTES = RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: 'detail', component: DetailComponent },
  { path: 'host', component: HostComponent }
]);

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    APP_ROUTES
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    WorkspaceComponent,
    HomeComponent,
    ListComponent,
    DetailComponent,
    HostComponent,
    BladeComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    RESOURCE_CACHE_PROVIDER,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: AppService, useClass: AppService }
  ]
})
export class AppModule { }
