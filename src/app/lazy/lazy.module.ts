import { CommonModule } from '@angular/common';
import { NgModule, ComponentFactoryResolver } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BladeRegistry, BladeMetaData } from './../blader/index';
import { LazyBladeComponent } from './lazyBlade.component';

const LAZY_ROUTES = [
  { path: '', component: LazyBladeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LAZY_ROUTES)
  ],
  declarations: [
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
    console.log(`registering LazyBladeComponent...`);

    this._bladeRegistry.register(new BladeMetaData('lazy',LazyBladeComponent));

    console.log(this._bladeRegistry);
  }
}
