import { Component, Type, OnDestroy } from '@angular/core';

import { Blade } from './../blader/index';

@Component({
  selector: 'tw-home',
  template: `
  <h1>{{ title }}</h1>
  <p>I am the home component 
     and I appear as single component on the root route 
     or as a blade in the host route.</p>`
})
export class HomeComponent implements OnDestroy, Blade {
  public id: number;
  public title: string = 'Home blade';
  public isDirty: boolean = false;

  public get key(): string {
    return 'HomeComponent';
  }

  public get component(): Type<any> {
    return HomeComponent;
  }

  public ngOnDestroy(): void {
    console.log('destroying HomeComponent...');
  }
}
