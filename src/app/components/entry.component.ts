import { Component, Type, OnInit } from '@angular/core';

import { Blade, BladeService } from './../blader/index';

@Component({
  selector: 'tw-entry',
  template: `
  <ul>
    <li (click)="clicked('list')">List</li>
    <li (click)="clicked('detail')">Detail</li>
  </ul>`
})
export class EntryComponent implements Blade, OnInit {
  public id: number;
  public title: string = 'Entry';
  public isDirty: boolean = false;

  public get key(): string {
    return 'EntryComponent';
  }

  public get component(): Type<any> {
    return EntryComponent;
  }

  public constructor(
    private _svc: BladeService
  ) { }

  public ngOnInit(): void {
    console.log(`initialize ${this.key}...`);
  }

  public clicked(key: string): void {
    if (key === 'list') {
      this._svc.executeAction(key, [
        { key: 'viewDefId', value: 'ProductListViewDef' }
      ]);
    } else {
      this._svc.executeAction(key, [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ]);
    }
  }
}
