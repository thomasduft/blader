import { Component, Type } from '@angular/core';

import { IBlade, BladeService } from './../blades/index';

@Component({
  selector: 'tw-entry',
  template: `
  <h1>Entry blade</h1>
  <ul>
    <li (click)="clicked('list')">List</li>
    <li (click)="clicked('detail')">Detail</li>
  </ul>`
})
export class EntryComponent implements IBlade {
  public get key(): string {
    return 'EntryComponent';
  }

  public get component(): Type<any> {
    return EntryComponent;
  }

  public constructor(
    private _svc: BladeService
  ) {
  }

  public clicked(key: string): void {
    this._svc.executeAction(key);
  }
}
