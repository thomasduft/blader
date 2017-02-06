import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Output,
  EventEmitter,
  ComponentRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild
} from '@angular/core';

import { BladeContext, IBladeArgs, BladeState } from './models';

@Component({
  selector: 'tw-blade',
  host: { 'class': 'blade' },
  template: `
  <div class="blade-header" (click)="clicked($event)">
    <span (click)="changeState($event, 0)">
      minimize
    </span>
    <span (click)="changeState($event, 1)">
      simple
    </span>
    <span (click)="changeState($event, 2)">
      normal
    </span>
    <span (click)="changeState($event, 3)">
      maximize
    </span>
    <span *ngIf="!closeIsHidden" (click)="close($event)">
      close
    </span>
    <h3>{{ title }}</h3>
  </div>
  <div class="blade-content">
    <template #bladeContent></template>
  </div>`
})
export class BladeComponent implements OnInit, OnDestroy {
  private _componentRef: ComponentRef<any>;

  @Input()
  public context: BladeContext;

  @Output()
  public stateChanged: EventEmitter<BladeState> = new EventEmitter<BladeState>();

  @Output()
  public selected: EventEmitter<IBladeArgs> = new EventEmitter<IBladeArgs>();

  @Output()
  public closed: EventEmitter<IBladeArgs> = new EventEmitter<IBladeArgs>();

  public get title(): string {
    return this._componentRef.instance.title;
  }

  public get isDirty(): boolean {
    return this._componentRef.instance.isDirty;
  }

  public get closeIsHidden(): boolean {
    if (this.context.isEntry) {
      return true;
    }

    return this.isDirty;
  }

  @ViewChild('bladeContent', { read: ViewContainerRef })
  protected bladeContent: ViewContainerRef;

  public ngOnInit(): void {
    if (this.context) {
      let injector = this.bladeContent.injector;
      let factory = injector.get(ComponentFactoryResolver).resolveComponentFactory(this.context.blade.component);

      this._componentRef = this.bladeContent.createComponent(factory, this.bladeContent.length);
      this._componentRef.instance.id = this.context.id;
    }
  }

  public ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
    }
  }

  public clicked(event: Event): void {
    event.preventDefault();

    this.selected.next(this.context.toBladeArgs());
  }

  public changeState(event: Event, state: BladeState): void {
    event.preventDefault();

    this.stateChanged.next(state);
  }

  public close(event: Event): void {
    event.preventDefault();

    this.closed.next(this.context.toBladeArgs());
  }
}
