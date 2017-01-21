import { Component } from '@angular/core';

import { AppService } from './app.service';

@Component({
  selector: 'app',
  template: `
  <div class="body">
    <tw-sidebar></tw-sidebar>
    <tw-workspace></tw-workspace>
  </div>`
})
export class AppComponent {
  public echo: string = '';

  public constructor(
    private _svc: AppService
  ) { }

  public ngOnInit(): void {
    this.echo = this._svc.echo('Hi there!');
  }
}
