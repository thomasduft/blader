import { Component, Type } from '@angular/core';

import { IBlade, BladeService } from './../blades/index';

@Component({
  selector: 'tw-list',
  template: `
  <h1>Blader List</h1>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li (click)="clicked('detail')">Detail</li>
    <li>E</li>
    <li>F</li>
    <li>G</li>
    <li>H</li>
    <li>I</li>
    <li>J</li>
    <li>K</li>
    <li>L</li>
  </ul>
  <p>
    I just listed some characters.
  </p>`
})
export class ListComponent implements IBlade {
  public get key(): string {
    return 'ListComponent';
  }

  public get component(): Type<any> {
    return ListComponent;
  }

  public constructor(
    private _svc: BladeService
  ) { }

  public clicked(key: string): void {
    this._svc.executeAction(key);
  }
}
