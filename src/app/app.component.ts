import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <div class="body">
    <tw-sidebar></tw-sidebar>
    <tw-workspace></tw-workspace>
  </div>`
})
export class AppComponent {
}
