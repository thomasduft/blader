import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  BladerComponent,
  BladeComponent,
  BladeRegistryService,
  BladeService,
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
    { provide: BladeRegistryService, useClass: BladeRegistryService },
    { provide: BladeService, useClass: BladeService }
  ]
})
export class BladerModule {
}
