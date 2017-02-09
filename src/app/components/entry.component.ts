import { Component } from '@angular/core';

import { IBladeComponent, BladeManager } from './../blader/index';

@Component({
  selector: 'tw-entry',
  template: `
  <ul>
    <li (click)="clicked('list')">List</li>
    <li (click)="clicked('detail')">Detail</li>
  </ul>`
})
export class EntryComponent implements IBladeComponent {
  public id: number;
  public title: string = 'Entry';
  public isDirty: boolean = false;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public clicked(key: string): void {
    if (key === 'list') {
      this._mgr.executeAction(key, [
        { key: 'viewDefId', value: 'ProductListViewDef' }
      ]);
    } else {
      this._mgr.executeAction(key, [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ]);
    }
  }
}
