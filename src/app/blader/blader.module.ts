import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BladerComponent, CanDeactivateBladerComponent } from './blader.component';
import { BladeComponent } from './blade.component';
import { BladeManager } from './bladeManager.service';

const BLADER_ROUTES = [
  {
    path: 'blader/:entry',
    component: BladerComponent,
    canDeactivate: [CanDeactivateBladerComponent]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(BLADER_ROUTES)
  ],
  declarations: [
    BladerComponent,
    BladeComponent
  ],
  providers: [
    { provide: BladeManager, useClass: BladeManager },
    { provide: CanDeactivateBladerComponent, useClass: CanDeactivateBladerComponent }
  ]
})
export class BladerModule { }
