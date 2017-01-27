import { Component, Type, OnInit, OnDestroy } from '@angular/core';

import { Blade, BladeService } from './../blades/index';

@Component({
  selector: 'tw-detail',
  template: `
  <h1>Blader Detail</h1>
  <p>Context ID: {{ id }}</p>
  <h4>Arguments</h4>
  <p>
    ViewDefId: {{ viewDefId }}
  </p>
  <p>
    ObjKey: {{ objKey }}
  </p>`
})
export class DetailComponent implements Blade, OnInit, OnDestroy {
  public id: number;
  public viewDefId: string;
  public objKey: string;

  public get key(): string {
    return 'DetailBlade';
  }

  public get component(): Type<any> {
    return DetailComponent;
  }

  public constructor(
    private _svc: BladeService
  ) { }

  public ngOnInit(): void {
    console.log(`initialize ${this.key}...`);

    this.viewDefId = this._svc.getParamValue<string>(this.id, 'viewDefId');
    this.objKey = this._svc.getParamValue<string>(this.id, 'objKey');
  }

  public ngOnDestroy(): void {
    console.log(`destroying ${this.key}...`);
  }
}
