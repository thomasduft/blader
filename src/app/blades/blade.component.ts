import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IBlade, BladeState } from './models';

@Component({
  selector: 'tw-blade',
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
    <span (click)="close($event)">
      close
    </span>
  </div>
  <div class="blade-content">
    <ng-container *ngComponentOutlet="blade.component"></ng-container>
  </div>`
})
export class BladeComponent {
  @Input() public blade: IBlade;
  @Output() public selected: EventEmitter<IBlade> = new EventEmitter<IBlade>();
  @Output() public stateChanged: EventEmitter<BladeState> = new EventEmitter<BladeState>();
  @Output() public closed: EventEmitter<IBlade> = new EventEmitter<IBlade>();

  public clicked(event: Event): void {
    event.preventDefault();

    this.selected.next(this.blade);
  }

  public changeState(event: Event, state: BladeState): void {
    event.preventDefault();

    this.stateChanged.next(state);
  }

  public close(event: Event): void {
    event.preventDefault();

    this.closed.next(this.blade);
  }
}
