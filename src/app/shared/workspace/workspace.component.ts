import { Component } from '@angular/core';

@Component({
  selector: 'tw-workspace',
  host: { 'class': 'main' },
  template: `
  <div class="main-header">header bar</div>
  <!-- <status-bar></status-bar> -->
  <div class="content">
    <router-outlet></router-outlet>
  </div>
  <div class="main-footer">footer bar</div>`
})
export class WorkspaceComponent {
}
