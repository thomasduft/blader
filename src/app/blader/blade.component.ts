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
  ComponentFactoryResolver
} from '@angular/core';

import {
  BladeContext,
  BladeArgs,
  BladeState
} from './models';

@Component({
  selector: 'tw-blade',
  host: { 'class': 'blade' },
  template: `
  <div class="blade-header" (click)="clicked()">
    <span (click)="changeState(1)">simple</span>|
    <span (click)="changeState(2)">normal</span>|
    <span (click)="changeState(3)">maximize</span>|
    <span *ngIf="canClose" (click)="close()">close</span>
    <h3>{{ title }}</h3>
  </div>
  <div class="blade-content">
    <ng-template #bladeContent></ng-template>
  </div>`
})
export class BladeComponent implements OnInit, OnDestroy {
  private _componentRef: ComponentRef<any>;

  @Input()
  public context: BladeContext;

  @Output()
  public stateChanged: EventEmitter<BladeState> = new EventEmitter<BladeState>();

  @Output()
  public selected: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  @Output()
  public closed: EventEmitter<BladeArgs> = new EventEmitter<BladeArgs>();

  public get title(): string {
    return this._componentRef.instance.title;
  }

  public get isDirty(): boolean {
    return this._componentRef.instance.isDirty;
  }

  public get canClose(): boolean {
    if (this.context.isEntry) {
      return false;
    }

    return !this.isDirty;
  }

  @ViewChild('bladeContent', { read: ViewContainerRef })
  protected bladeContent: ViewContainerRef;

  public ngOnInit(): void {
    if (this.context) {
      const factory = this.context.metaData.factoryFn
        ? this.context.metaData.factoryFn()
        : this.bladeContent.injector
          .get(ComponentFactoryResolver)
          .resolveComponentFactory(this.context.metaData.component);

      this._componentRef = this.bladeContent
        .createComponent(factory, this.bladeContent.length);
      this._componentRef.instance.id = this.context.id;

      console.log(`initialized ${this.title} blade:`, this.context.id);
    }
  }

  public ngOnDestroy(): void {
    if (this._componentRef) {
      console.log(`destroying ${this.title}`);

      this._componentRef.destroy();
    }
  }

  public clicked(): void {
    this.selected.next(this.context.toBladeArgs());
  }

  public changeState(state: BladeState): void {
    this.stateChanged.next(state);
  }

  public close(): void {
    this.closed.next(this.context.toBladeArgs());
  }
}
