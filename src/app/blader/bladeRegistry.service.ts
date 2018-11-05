import { Injectable } from '@angular/core';

import { BladeMetaData } from './models';

@Injectable({
  providedIn: 'root'
})
export class BladeRegistry {
  private _registry: Map<string, BladeMetaData> = new Map<string, BladeMetaData>();

  public register(blade: BladeMetaData): void {
    if (this._registry.has(blade.key)) { return; }

    this._registry.set(blade.key, blade);
  }

  public exists(key: string): boolean {
    return this._registry.has(key);
  }

  public get(key: string): BladeMetaData {
    const item = this._registry.get(key);

    if (!item) {
      throw new Error(`BladeMetaData for key ${key} was not found!`);
    }

    return item;
  }
}
