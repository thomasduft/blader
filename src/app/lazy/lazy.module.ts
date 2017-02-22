import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BladeRegistry, BladeMetaData } from './../blader/index';
import { LazyBladeComponent } from './lazyBlade.component';

const LAZY_ROUTERS = [
  { path: '', component: LazyBladeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LAZY_ROUTERS)
  ],
  declarations: [
    LazyBladeComponent
  ],
  entryComponents: [
    LazyBladeComponent
  ],
  exports: [
    LazyBladeComponent
  ]
})
export class LazyModule {
  public constructor(
    private _bladeRegistry: BladeRegistry
  ) {
    this._bladeRegistry.register(new BladeMetaData('lazy', LazyBladeComponent));

    console.log(this._bladeRegistry);
  }
}
