import { Injectable } from '@angular/core';

import { BladeParam, BladeContext, BladeMetaData } from './models';
import { BladeRegistry } from './bladeRegistry.service';

@Injectable()
export class BladeManager {
  private static BLADER_HISTORY_KEY = 'bladerHistory';

  private _blades: Array<BladeContext> = new Array<BladeContext>();

  public entryId: number;

  // TODO: observable subject ???
  public selected: BladeContext | undefined;

  public get blades(): Array<BladeContext> {
    return this._blades;
  }

  public get mustRestore(): boolean {
    return sessionStorage.getItem(BladeManager.BLADER_HISTORY_KEY) !== null;
  }

  public constructor(
    private _registry: BladeRegistry
  ) { }

  public add(key: string, params?: Array<BladeParam>, id?: number): number {
    // check whether key exists in registry!
    const metaData = this.getMetaData(key);
    const newId = id ? id : new Date().valueOf();
    const ctx = new BladeContext(newId, metaData, params);

    ctx.isEntry = this._blades.length === 0;
    if (ctx.isEntry) {
      this.entryId = newId;
    }
    this._blades.push(ctx);
    sessionStorage.setItem(BladeManager.BLADER_HISTORY_KEY, JSON.stringify(this._blades));

    return newId;
  }

  public restore(): void {
    const history = sessionStorage.getItem(BladeManager.BLADER_HISTORY_KEY);
    if (!history) { return; }

    const historyCtx: Array<BladeContext> = JSON.parse(history);
    historyCtx.forEach((b: BladeContext) => {
      if (b.isEntry) {
        this.entryId = b.id;
      }
      this.add(b.metaData.key, b.params, b.id);
    });
  }

  public reset(): void {
    sessionStorage.removeItem(BladeManager.BLADER_HISTORY_KEY);
  }

  public remove(id: number): void {
    if (this.exists(id)) {
      this._blades = this._blades.filter((b: BladeContext) => {
        return b.id !== id;
      });
      sessionStorage.setItem(BladeManager.BLADER_HISTORY_KEY, JSON.stringify(this._blades));
    }
  }

  public exists(id: number): boolean {
    return this._blades.some((b: BladeContext) => b.id === id);
  }

  public get(id: number): BladeContext {
    const item = this._blades.find((b: BladeContext) => {
      return b.id === id;
    });

    if (!item) { throw new Error(`BladeData for key ${id} was not found!`); }

    return item;
  }

  public select(id: number): void {
    this.selected = this.get(id);
  }

  public getParamValue<T>(id: number, paramKey: string): any {
    if (!this.exists(id)) {
      console.log(`Param ${paramKey} for blade ${id} does not exist!`);
      return;
    }

    const ctx = <BladeContext>this.get(id);

    if (!ctx.hasParams) { throw new Error(`Blade ${ctx.metaData.key} does not support parameters!`); }

    const param = ctx.params.find((p: BladeParam) => {
      return p.key === paramKey;
    });

    if (param) {
      return <T>param.value;
    }

    throw new Error(`Param ${paramKey} for ${id} does not exist!`);
  }

  private getMetaData(key: string): BladeMetaData {
    if (!this._registry.exists(key)) {
      throw new Error(`BladeMetaData for key ${key} not found!`);
    }

    return this._registry.get(key);
  }
}
