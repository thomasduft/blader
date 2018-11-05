import { Component } from '@angular/core';

import { IBladeComponent, BladeManager } from './../blader/index';

@Component({
  selector: 'tw-entry',
  template: `
  <ul>
    <li (click)="clicked('list')">List</li>
    <li (click)="clicked('detail')">Detail</li>
    <li (click)="clicked('lazy')">Lazy</li>
  </ul>`
})
export class EntryComponent implements IBladeComponent {
  public id: number;
  public title = 'Entry';
  public isDirty = false;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public clicked(key: string): void {
    if (key === 'list') {
      this._mgr.add(key, [
        { key: 'viewDefId', value: 'ProductListViewDef' }
      ]);
    } else if (key === 'lazy') {
      this._mgr.add(key);
    } else {
      this._mgr.add(key, [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ]);
    }
  }
}
