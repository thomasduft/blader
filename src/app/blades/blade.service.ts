import { Injectable } from '@angular/core';

import { IBlade, IBladeContext, IBladeParam, BladeContext, BladeMetaData, UniqueIdCreator } from './models';
import { BladeRegistryService } from './bladeRegistry.service';

@Injectable()
export class BladeService {
  private _blades: Map<string, IBladeContext> = new Map<string, IBladeContext>();

  // TODO: observable subject ???
  public selected: IBladeContext | undefined;

  public get blades(): Array<IBlade> {
    return Array.from(this._blades.values(), (v: IBladeContext) => {
      return { key: v.key, component: v.component };
    });
  }

  public constructor(
    private _registry: BladeRegistryService
  ) { }

  public add(key: string, params?: Array<IBladeParam>): string {
    // check whether key exists in registry!
    let metaData = this.getMetaData(key);

    // TODO check also on equal params otherwise a blade shows up only once.
    if (this._blades.has(key)) { return key; };

    let id = UniqueIdCreator.getGuid();

    this._blades.set(id, new BladeContext(id, metaData.component, params));
    this.select(id);
    return id;
  }

  public remove(id: string): boolean {
    if (this._blades.has(id)) {
      return this._blades.delete(id);
    };

    return false;
  }

  public exists(id: string): boolean {
    return this._blades.has(id);
  }

  public get(id: string): IBladeContext {
    let item = this._blades.get(id);

    if (!item) { throw new Error(`BladeData for key ${id} was not found!`); }

    return item;
  }

  public select(id: string): void {
    this.selected = this._blades.get(id);
  }

  public executeAction(key: string): void {
    if (this._registry.exists(key)) {
      this.add(key);
    }
  }

  private getMetaData(key: string): BladeMetaData {
    if (!this._registry.exists(key)) {
      throw new Error(`BladeMetaData for key ${key} not found!`);
    }

    return this._registry.get(key);
  }
}
