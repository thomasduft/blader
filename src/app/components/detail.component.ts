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
  <p>ViewDefId: {{ viewDefId }}</p>
  <p>ObjKey: {{ objKey }}</p>
  <p (click)="newTitle()">{{ title }} <-- click to change</p>
  <p>
    <button type="button" *ngIf="isDirty" (click)="cancel()">Cancel changes</button>
  </p>
  <p>
    <input type="text" #goto placeholder="enter id of blade..." />
    <button (click)="select(goto.value)">go to</button>
  </p>
  `
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

  public cancel(): void {
    this.isDirty = false;
  }

  public select(id: string): void {
    this._mgr.select(Number.parseFloat(id));
  }
}
