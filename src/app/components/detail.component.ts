import { Component, Type } from '@angular/core';

import { IBlade } from './../blades/index';

@Component({
  selector: 'tw-detail',
  template: `
  <h1>Blader Detail</h1>`
})
export class DetailComponent implements IBlade {
  public get key(): string {
    return 'DetailBlade';
  }

  public get component(): Type<any> {
    return DetailComponent;
  }
}
