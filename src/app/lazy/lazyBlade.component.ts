import { Component } from '@angular/core';

import {
  Blade,
  BladeManager
} from './../blader/index';

@Component({
  selector: 'tw-lazy',
  template: `
  <h1>Hello from lazy blade!</h1>
  <button type="button" (click)="clicked('detail')">Detail</button>
  <p>{{id}}</p>
  `
})
export class LazyBladeComponent implements Blade {
  public id: number;
  public title = 'Lazy';
  public isDirty = false;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public clicked(key: string): void {
    this._mgr.addWithParams({
      key,
      params: [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ]
    });
  }
}
