import { Component, Type, OnInit } from '@angular/core';

import { IBlade, BladeState } from './../blades/index';
import {
  HomeComponent,
  ListComponent,
  DetailComponent
} from './index';

@Component({
  selector: 'tw-host',
  host: { 'class': 'blade-host' },
  template: `
  <section class="blade" 
    *ngFor="let blade of blades">
    <tw-blade [blade]="blade" 
              (selected)="selectBlade($event)"
              (stateChanged)="stateChanged($event)"
              (closed)="closed($event)"></tw-blade>
  </section>`
})
export class HostComponent implements OnInit {
  public blades: Array<IBlade>;
  public selectedBlade: IBlade;

  public ngOnInit(): void {
    this.blades = new Array<IBlade>();
    this.blades.push(new HomeBlade());
    this.blades.push(new ListBlade());
    this.blades.push(new DetailBlade());

    // allways the last one should be selected
    this.selectedBlade = this.blades[2];
  }

  public selectBlade(blade: IBlade): void {
    if (this.selectedBlade && blade.key === this.selectedBlade.key) { return; }

    this.selectedBlade = blade;
    console.log(`selected blade: ${this.selectedBlade.key}`);
  }

  public stateChanged(state: BladeState): void {
    console.log(`state of blade ${this.selectedBlade.title} changed: ${state}`);
  }

  public closed(blade: IBlade): void {
    if (this.selectedBlade && blade.key !== this.selectedBlade.key) { return; }

    console.log(`closing blade: ${this.selectedBlade.key}`);

    // do all the closing stuff like remove from list, set selectedBlade, etc...
  }
}

export class HomeBlade implements IBlade {
  public get key(): string {
    return 'HomeBlade';
  }

  public get title(): string {
    return 'Home';
  }

  public get component(): Type<any> {
    return HomeComponent;
  }
}

export class ListBlade implements IBlade {
  public get key(): string {
    return 'ListBlade';
  }

  public get title(): string {
    return 'List';
  }

  public get component(): Type<any> {
    return ListComponent;
  }
}

export class DetailBlade implements IBlade {
  public get key(): string {
    return 'DetailBlade';
  }

  public get title(): string {
    return 'Detail';
  }

  public get component(): Type<any> {
    return DetailComponent;
  }
}
