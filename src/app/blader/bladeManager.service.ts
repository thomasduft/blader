import { Injectable } from '@angular/core';

import { BladeParam, Blade, BladeContext, BladeMetaData } from './models';
import { BladeRegistry } from './bladeRegistry.service';

@Injectable()
export class BladeManager {
  private _blades: Array<BladeContext> = new Array<BladeContext>();

  // TODO: observable subject ???
  public selected: BladeContext | undefined;

  public get blades(): Array<BladeContext> {
    return this._blades;
  }

  public constructor(
    private _registry: BladeRegistry
  ) { }

  public add(key: string, params?: Array<BladeParam>): number {
    // check whether key exists in registry!
    let metaData = this.getMetaData(key);

    let id = new Date().valueOf();
    let blade = new Blade(metaData.key, metaData.component);

    let ctx = new BladeContext(id, blade, params);
    ctx.isEntry = this._blades.length === 0;
    this._blades.push(ctx);

    this.select(id);

    return id;
  }

  public remove(id: number): void {
    if (this.exists(id)) {
      this._blades = this._blades.filter((b: BladeContext) => {
        return b.id !== id;
      });
    };
  }

  public exists(id: number): boolean {
    return this._blades.some((b: BladeContext) => { return b.id === id; });
  }

  public get(id: number): BladeContext {
    let item = this._blades.find((b: BladeContext) => {
      return b.id === id;
    });

    if (!item) { throw new Error(`BladeData for key ${id} was not found!`); }

    return item;
  }

  public select(id: number): void {
    this.selected = this.get(id);
  }

  public executeAction(key: string, params?: Array<BladeParam>): void {
    if (this._registry.exists(key)) {
      this.add(key, params);
    }
  }

  public getParamValue<T>(id: number, paramKey: string): any {
    if (!this.exists(id)) {
      console.log(`Param ${paramKey} for blade ${id} does not exist!`);
      return;
    }

    let ctx = <BladeContext>this.get(id);

    if (!ctx.hasParams) { throw new Error(`Blade ${ctx.blade.key} does not support parameters!`); }

    let param = ctx.params.find((p: BladeParam) => {
      return p.key === paramKey;
    });

    if (param) {
      return <T>param.value;
    }

    throw new Error(`Param ${paramKey} does not exist!`);
  }

  private getMetaData(key: string): BladeMetaData {
    if (!this._registry.exists(key)) {
      throw new Error(`BladeMetaData for key ${key} not found!`);
    }

    return this._registry.get(key);
  }
}
