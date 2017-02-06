import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  BladerComponent,
  BladeComponent,
  BladeRegistry,
  BladeManager,
} from './index';

const BLADER_ROUTES = RouterModule.forChild([
  { path: 'blader/:entry', component: BladerComponent }
]);

@NgModule({
  imports: [
    CommonModule,
    BLADER_ROUTES
  ],
  declarations: [
    BladerComponent,
    BladeComponent
  ],
  providers: [
    { provide: BladeRegistry, useClass: BladeRegistry },
    { provide: BladeManager, useClass: BladeManager }
  ]
})
export class BladerModule {
}
