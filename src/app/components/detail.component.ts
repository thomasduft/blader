import { Component, Type, OnInit, OnDestroy } from '@angular/core';

import { Blade, BladeManager } from './../blader/index';

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
export class DetailComponent implements Blade, OnInit, OnDestroy {
  public id: number;
  public title: string = 'Detail';
  public isDirty: boolean = false;

  public viewDefId: string;
  public objKey: string;

  public get key(): string {
    return 'DetailBlade';
  }

  public get component(): Type<any> {
    return DetailComponent;
  }

  public constructor(
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    console.log(`initialize ${this.key}...`);

    this.viewDefId = this._mgr.getParamValue<string>(this.id, 'viewDefId');
    this.objKey = this._mgr.getParamValue<string>(this.id, 'objKey');
  }

  public ngOnDestroy(): void {
    console.log(`destroying ${this.key}...`);
  }

  public newTitle(): void {
    this.title = new Date().toDateString();
    this.isDirty = true;
  }
}
