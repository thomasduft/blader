import { Component, OnInit } from '@angular/core';

import {
  Blade,
  BladeState,
  BladeManager
} from './../blader/index';

@Component({
  selector: 'tw-list',
  template: `
  <p>Context ID: {{ id }}</p>
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
  </p>
  <h4>Arguments</h4>
  <p>
    ViewDefId: {{ viewDefId }}
  </p>`
})
export class ListComponent implements Blade, OnInit {
  public id: number;
  public title = 'List';
  public isDirty = false;

  public viewDefId: string;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    this.viewDefId = this._mgr.getParamValue<string>(this.id, 'viewDefId');
  }

  public clicked(key: string): void {
    this._mgr.addWithParams({
      key: key,
      params: [
        { key: 'viewDefId', value: 'ProductViewDef' },
        { key: 'objKey', value: 'Product(1)' }
      ],
      state: BladeState.wide
    });
  }
}
