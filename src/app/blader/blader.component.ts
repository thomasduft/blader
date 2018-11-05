import {
  Component,
  Injectable,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList
} from '@angular/core';
import {
  ActivatedRoute,
  CanDeactivate
} from '@angular/router';

import {
  BladeContext,
  BladeArgs,
  BladeState
} from './models';
import { BladeManager } from './bladeManager.service';
import { BladeComponent } from './blade.component';

@Component({
  selector: 'tw-blader',
  host: { 'class': 'blader' },
  providers: [
    BladeManager
  ],
  template: `
  <tw-blade
    *ngFor="let ctx of bladeContexts"
    [context]="ctx"
    (stateChanged)="stateChanged($event)"
    (selected)="selectBlade($event)"
    (closed)="closed($event)">
  </tw-blade>`
})
export class BladerComponent implements OnInit, OnDestroy {
  private _entryComponentId: number;

  @ViewChildren(BladeComponent)
  private _blades: QueryList<BladeComponent>;

  public get bladeContexts(): Array<BladeContext> {
    return this._mgr.blades;
  }

  public constructor(
    private _route: ActivatedRoute,
    private _mgr: BladeManager
  ) { }

  public ngOnInit(): void {
    // TODO: unsubscribe
    this._route.params
      .subscribe((params: { entry: string }) => {
        if (this._mgr.mustRestore) {
          this._mgr.restore();
        } else {
          this._mgr.add(params.entry);
        }
        this._entryComponentId = this._mgr.entryId;
      });
  }

  public ngOnDestroy(): void {
    this._mgr.reset();
  }

  public stateChanged(state: BladeState): void {
    if (this._mgr.selected) {
      console.log(`state of blade ${this._mgr.selected.metaData.key} changed: ${state}`);
    }
  }

  public selectBlade(args: BladeArgs): void {
    if (this._mgr.selected
      && args.id === this._mgr.selected.id) {
      return;
    }

    this._mgr.select(args.id);
    console.log(`selected blade: ${args.id}`);
  }

  public closed(args: BladeArgs): void {
    if (this._entryComponentId === args.id) {
      return;
    }

    console.log(`closing blade: ${args.id}`);
    this._mgr.remove(args.id);
  }

  public getDirtyBlades(): Array<BladeComponent> {
    const blades = this._blades.toArray();
    return blades.filter((b: BladeComponent) => {
      return b.isDirty;
    });
  }
}

@Injectable()
export class CanDeactivateBladerComponent implements CanDeactivate<BladerComponent> {
  public canDeactivate(component: BladerComponent): boolean {
    let canClose = true;
    const dirtyBlades = component.getDirtyBlades();
    if (dirtyBlades.length > 0) {
      canClose = false;
      const msg = dirtyBlades.map((b: BladeComponent) => {
        return b.title;
      }).join(', ');
      alert(`Please save or undo your work on the blades:\n ${msg}`);
    }

    return canClose;
  }
}
