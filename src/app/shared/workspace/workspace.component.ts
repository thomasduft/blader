import { Component } from '@angular/core';

@Component({
  selector: 'tw-workspace',
  host: { 'class': 'main' },
  template: `
  <div class="content">
    <router-outlet></router-outlet>
  </div>
`
})
export class WorkspaceComponent {
}
