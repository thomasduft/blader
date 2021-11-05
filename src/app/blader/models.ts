import { Type } from '@angular/core';

export interface Blade {
  id: number;
  title: string;
  isDirty: boolean;
}

export enum BladeState {
  default = 1,
  wide = 2
}

export interface BladeCreationParams {
  key: string;
  params?: Array<BladeParam>;
  state?: BladeState;
  id?: number;
}

export class BladeParam {
  public key: string;
  public value: any;
}

export interface BladeArgs {
  id: number;
  metaData: BladeMetaData;
}

export class BladeContext {
  public get hasParams(): boolean {
    return this.params.length > 0;
  }

  public params: Array<BladeParam>;

  public isEntry = false;

  public constructor(
    public id: number,
    public metaData: BladeMetaData,
    params?: Array<BladeParam>
  ) {
    if (params) {
      this.params = params;
    } else {
      this.params = new Array<BladeParam>();
    }
  }

  public toBladeArgs(): BladeArgs {
    return { id: this.id, metaData: this.metaData };
  }
}

export class BladeMetaData {
  public constructor(
    public key: string,
    public component: Type<any>,
  ) { }
}

export class BladeParamConstants {
  public static readonly BLADE_KEY = 'bladeKey';
  public static readonly BLADE_STATE = 'bladeState';
}
