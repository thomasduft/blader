import { Component, OnInit } from '@angular/core';

import {
  Blade,
  BladeManager
} from './../blader/index';

@Component({
  selector: 'tw-detail',
  template: `
  <p>Context ID: {{ id }}</p>
  <h4>Arguments</h4>
  <p>
    ViewDefId: {{ viewDefId }}
  </p>
  <p>
    ObjKey: {{ objKey }}
  </p>
  <p (click)="newTitle()">{{ title }}</p>`
})
export class DetailComponent implements Blade, OnInit {
  public id: number;
  public title = 'Detail';
  public isDirty = false;

  public viewDefId: string;
  public objKey: string;

  public constructor(
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    this.viewDefId = this._mgr.getParamValue<string>(this.id, 'viewDefId');
    this.objKey = this._mgr.getParamValue<string>(this.id, 'objKey');
  }

  public newTitle(): void {
    this.title = new Date().toDateString();
    this.isDirty = true;
  }
}
