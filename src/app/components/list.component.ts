import { Component, Type, OnInit } from '@angular/core';

import { Blade, BladeService } from './../blader/index';

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
  public title: string = 'List';
  public isDirty: boolean = false;

  public viewDefId: string;

  public get key(): string {
    return 'ListComponent';
  }

  public get component(): Type<any> {
    return ListComponent;
  }

  public constructor(
    private _svc: BladeService
  ) { }

  public ngOnInit(): void {
    console.log(`initialize ${this.key}...`);

    this.viewDefId = this._svc.getParamValue<string>(this.id, 'viewDefId');
  }

  public clicked(key: string): void {
    this._svc.executeAction(key, [
      { key: 'viewDefId', value: 'ProductViewDef' },
      { key: 'objKey', value: 'Product(1)' }
    ]);
  }
}
