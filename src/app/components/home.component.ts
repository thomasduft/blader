import { Component, Type, OnInit, OnDestroy } from '@angular/core';

import { Blade } from './../blades/index';
import { AppService } from './../app.service';

@Component({
  selector: 'tw-home',
  template: `
  <h1>{{ title }}</h1>
  <p>I am the home component 
     and I appear as single component on the root route 
     or as a blade in the host route.</p>`
})
export class HomeComponent implements OnInit, OnDestroy, Blade {
  public id: number;
  public title: string = 'Home blade';

  public get key(): string {
    return 'HomeComponent';
  }

  public get component(): Type<any> {
    return HomeComponent;
  }

  public constructor(
    private _appService: AppService
  ) { }

  public ngOnInit(): void {
    console.log(this._appService.echo('hi from HomeComponent'));
  }

  public ngOnDestroy(): void {
    console.log('destroying HomeComponent...');
  }
}
