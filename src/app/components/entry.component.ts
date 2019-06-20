import { Component } from '@angular/core';

import {
  Blade,
  BladeManager
} from './../blader/index';

@Component({
  selector: 'tw-entry',
  template: `
  <ul>
    <li (click)="clicked('list')">List</li>
    <li (click)="clicked('detail')">Detail</li>
    <li (click)="clicked('lazy')">Lazy</li>
  </ul>`
})
export class EntryComponent implements Blade {
  public id: number;
  public title = 'Entry';
  public isDirty = false;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public clicked(key: string): void {
    if (key === 'list') {
      this._mgr.addWithParams({
        key,
        params: [
          { key: 'viewDefId', value: 'ProductListViewDef' }
        ]
      });
    } else if (key === 'lazy') {
      this._mgr.addWithParams({ key });
    } else {
      this._mgr.addWithParams({
        key,
        params: [
          { key: 'viewDefId', value: 'ProductViewDef' },
          { key: 'objKey', value: 'Product(1)' }
        ]
      });
    }
  }
}
