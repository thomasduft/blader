import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBlade, BladeState, BladeService } from './../blades/index';

@Component({
  selector: 'tw-blader',
  host: { 'class': 'blader' },
  providers: [
    BladeService
  ],
  template: `
  <section class="blade" 
    *ngFor="let blade of blades">
    <tw-blade [blade]="blade" 
              (selected)="selectBlade($event)"
              (stateChanged)="stateChanged($event)"
              (closed)="closed($event)"></tw-blade>
  </section>`
})
export class BladerComponent implements OnInit {
  private _entryComponentId: string;

  public get blades(): Array<IBlade> {
    return this._svc.blades;
  }

  public constructor(
    private _route: ActivatedRoute,
    private _svc: BladeService
  ) { }

  public ngOnInit(): void {
    this._route.params.subscribe((params: { entry: string }) => {
      this._entryComponentId = this._svc.add(params.entry);
    });
  }

  public selectBlade(blade: IBlade): void {
    if (this._svc.selected && blade.key === this._svc.selected.key) { return; }

    this._svc.select(blade.key);
    console.log(`selected blade: ${blade.key}`);
  }

  public stateChanged(state: BladeState): void {
    if (this._svc.selected) {
      console.log(`state of blade ${this._svc.selected.key} changed: ${state}`);
    }
  }

  public closed(blade: IBlade): void {
    if (this._entryComponentId === blade.key) { return; }
    // if (this._svc.selected && blade.key !== this._svc.selected.key) { return; }

    console.log(`closing blade: ${blade.key}`);
    this._svc.remove(blade.key);
  }
}
