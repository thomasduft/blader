import { Component } from '@angular/core';

import { IBladeComponent } from './../blader/index';

@Component({
  selector: 'lazy',
  template: `
  <h1>Hello from lazy blade!</h1>`,
})
export class LazyBladeComponent implements IBladeComponent {
  public id: number;
  public title: string = 'Lazy';
  public isDirty: boolean = false;
}
