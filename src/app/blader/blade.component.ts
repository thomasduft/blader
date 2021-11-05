import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
  HostListener,
  ElementRef
} from '@angular/core';

import {
  BladeContext,
  BladeArgs,
  BladeState,
  BladeParamConstants,
  Blade
} from './models';
import { BladeManager } from './bladeManager.service';

@Component({
  selector: 'tw-blade',
  host: {
    class: 'blade',
    '[class.blade--selected]': 'isSelected',
    '[class.blade--wide]': 'bladeState === 2'
  },
  template: `
  <div class="blade__header" (click)="select()">
    <div class="blade__commands">
      <span *ngIf="canMinimize" (click)="changeState(1)">
        <tw-icon name="window-minimize"></tw-icon>
      </span>
      <span *ngIf="canMaximize" (click)="changeState(2)">
        <tw-icon name="window-restore"></tw-icon>
      </span>
      <span *ngIf="canClose" (click)="close()">
        <tw-icon name="window-close"></tw-icon>
      </span>
    </div>
    <h3>{{ title }}</h3>
  </div>
  <div class="blade__content">
    <ng-template #bladeContent></ng-template>
  </div>`
})
export class BladeComponent implements OnInit, OnDestroy {
  private _componentRef: ComponentRef<any>;
  private _bladeState: BladeState = BladeState.default;

  @Input()
  public context: BladeContext;

  @Output()
  public stateChanged: EventEmitter<BladeState> = new EventEmitter<BladeState>();

  @Output()
  public selected: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  @Output()
  public closed: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  public get id(): number {
    return this._componentRef.instance.id;
  }

  public get title(): string {
    return this._componentRef.instance.title;
  }

  public get isDirty(): boolean {
    return this._componentRef.instance.isDirty;
  }

  public get canMinimize(): boolean {
    return this._bladeState === BladeState.wide;
  }

  public get canMaximize(): boolean {
    return this._bladeState === BladeState.default;
  }

  public get bladeState(): BladeState {
    return this._bladeState;
  }

  public get isSelected(): boolean {
    if (!this._mgr.selected) {
      return false;
    }

    if (!this.context) {
      return false;
    }

    return this._mgr.selected.id === this.context.id;
  }

  public get canClose(): boolean {
    if (this.context.isEntry) {
      return false;
    }

    return !this.isDirty;
  }

  @ViewChild('bladeContent', { read: ViewContainerRef, static: true })
  protected bladeContent: ViewContainerRef;

  public constructor(
    private _mgr: BladeManager,
    public element: ElementRef
  ) { }

  public ngOnInit(): void {
    if (this.context) {
      // const factory = this.context.metaData.factoryFn
      //   ? this.context.metaData.factoryFn()
      //   : this._resolver.resolveComponentFactory(this.context.metaData.component);

      this._componentRef = this.bladeContent.createComponent<Blade>(this.context.metaData.component);
      this._componentRef.instance.id = this.context.id;

      this.setBladeStateIfAvailable();

      console.log(`initialized ${this.title} blade:`, this.context.id);
    }
  }

  public ngOnDestroy(): void {
    if (this._componentRef) {
      console.log(`destroying ${this.title}`);

      this._componentRef.destroy();
    }
  }

  @HostListener('window:keydown', ['$event'])
  public shortCuts(event: KeyboardEvent): void {
    if (event.ctrlKey && event.key === 'q') {
      if (this.isSelected && this.canClose) {
        this.close();
      }
    }
  }

  public select(): void {
    this.selected.next(this.context.toBladeArgs());
  }

  public changeState(state: BladeState): void {
    this._bladeState = state;

    this.stateChanged.next(this._bladeState);
  }

  public close(): void {
    this.closed.next(this.context.toBladeArgs());
  }

  private setBladeStateIfAvailable(): void {
    if (this._mgr.paramValueExist(this.context.id, BladeParamConstants.BLADE_STATE)) {
      this._bladeState = this._mgr.getParamValue<BladeState>(
        this.context.id,
        BladeParamConstants.BLADE_STATE
      );

      this.changeState(this._bladeState);
    }
  }
}
