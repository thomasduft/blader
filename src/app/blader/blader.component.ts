import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  BladeContext,
  IBladeArgs,
  BladeState,
  BladeManager
} from './../blader/index';

@Component({
  selector: 'tw-blader',
  host: { 'class': 'blader' },
  providers: [
    BladeManager
  ],
  template: `
  <section class="blade" 
    *ngFor="let ctx of bladeContexts">
    <tw-blade [context]="ctx" 
              (stateChanged)="stateChanged($event)"
              (selected)="selectBlade($event)"
              (closed)="closed($event)"></tw-blade>
  </section>`
})
export class BladerComponent implements OnInit {
  private _entryComponentId: number;

  public get bladeContexts(): Array<BladeContext> {
    return this._mgr.blades;
  }

  public constructor(
    private _route: ActivatedRoute,
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    this._route.params.subscribe((params: { entry: string }) => {
      this._entryComponentId = this._mgr.add(params.entry);
    });
  }

  public stateChanged(state: BladeState): void {
    if (this._mgr.selected) {
      console.log(`state of blade ${this._mgr.selected.blade.key} changed: ${state}`);
    }
  }

  public selectBlade(args: IBladeArgs): void {
    if (this._mgr.selected && args.id === this._mgr.selected.id) { return; }

    this._mgr.select(args.id);
    console.log(`selected blade: ${args.id}`);
  }

  public closed(args: IBladeArgs): void {
    if (this._entryComponentId === args.id) { return; }
    // if (this._svc.selected && blade.key !== this._svc.selected.key) { return; }

    console.log(`closing blade: ${args.id}`);
    this._mgr.remove(args.id);
  }
}
