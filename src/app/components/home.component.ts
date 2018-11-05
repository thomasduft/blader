import { Component } from '@angular/core';

import { Blade } from './../blader/index';

@Component({
  selector: 'tw-home',
  template: `
  <h1>{{ title }}</h1>
  <p>I am the home component
     and I appear as single component on the root route
     or as a blade in the host route.</p>`
})
export class HomeComponent implements Blade {
  public id: number;
  public title = 'Home blade';
  public isDirty = false;
}
