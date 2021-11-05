import { Injectable, EventEmitter } from '@angular/core';

import {
  BladeParam,
  BladeContext,
  BladeMetaData,
  BladeCreationParams,
  BladeState,
  BladeParamConstants
} from './models';
import { BladeRegistry } from './bladeRegistry.service';

@Injectable()
export class BladeManager {
  private static BLADER_HISTORY_KEY = 'bladerHistory';

  private _blades: Array<BladeContext> = new Array<BladeContext>();

  public entryId: number;

  public selected: BladeContext | undefined;

  public afterSelected$: EventEmitter<number> = new EventEmitter<number>();

  public get blades(): Array<BladeContext> {
    return this._blades;
  }

  public get mustRestore(): boolean {
    return sessionStorage.getItem(BladeManager.BLADER_HISTORY_KEY) !== null;
  }

  public constructor(
    private _registry: BladeRegistry
  ) { }

  public addWithParams(params: BladeCreationParams) {
    return this.addInternal(params.key, params.id, params.params, params.state);
  }

  public restore(): void {
    const history = sessionStorage.getItem(BladeManager.BLADER_HISTORY_KEY);
    if (!history) { return; }

    const historyCtx: Array<BladeContext> = JSON.parse(history);
    historyCtx.forEach((b: BladeContext) => {
      if (b.isEntry) {
        this.entryId = b.id;
      }

      this.addWithParams({
        key: b.metaData.key,
        params: b.params,
        id: b.id
      });
    });
  }

  public reset(): void {
    sessionStorage.removeItem(BladeManager.BLADER_HISTORY_KEY);
  }

  public remove(id: number): void {
    if (this.exists(id)) {
      this.selectPrevious();

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

    this.afterSelected$.next(this.selected.id);
  }

  public selectPrevious(): void {
    const previousId = this.getPrevious(this.selected.id);
    if (previousId) {
      this.select(previousId);
    }
  }

  public paramValueExist(id: number, paramKey: string): boolean {
    const params = this.getBladeParamsIfBladeExists(id);
    return params.some((p: BladeParam) => {
      return p.key === paramKey;
    });
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

  private addInternal(key: string, id: number, params: BladeParam[], state?: BladeState) {
    const metaData = this.getMetaData(key);
    const newId = id ? id : new Date().valueOf();

    // Ensure that state is set if available.
    if (state) {
      params.push({ key: BladeParamConstants.BLADE_STATE, value: state });
    }

    const ctx = new BladeContext(newId, metaData, params);
    ctx.isEntry = this._blades.length === 0;
    if (ctx.isEntry) {
      this.entryId = newId;
    }
    this._blades.push(ctx);

    sessionStorage.setItem(BladeManager.BLADER_HISTORY_KEY, JSON.stringify(this._blades));

    this.select(ctx.id);

    return newId;
  }

  private getBladeParamsIfBladeExists(id: number): Array<BladeParam> {
    if (!this.exists(id)) {
      return new Array<BladeParam>();
    }

    const ctx = <BladeContext>this.get(id);
    if (!ctx.hasParams) {
      return new Array<BladeParam>();
    }

    return ctx.params;
  }

  private getMetaData(key: string): BladeMetaData {
    if (!this._registry.exists(key)) {
      throw new Error(`BladeMetaData for key ${key} not found!`);
    }

    return this._registry.get(key);
  }

  private getNext(id: number): number {
    let index: number = this.blades.findIndex(b => b.id === id);
    if (index < this.blades.length - 1) {
      index += 1;
    }

    return this.blades[index].id;
  }

  private getPrevious(id: number): number {
    let index: number = this.blades.findIndex(b => b.id === id);

    while (index > 0) {
      index -= 1;

      if (this.blades[index]) {
        break;
      }
    }

    return this.blades[index].id;
  }
}
