import { Type } from '@angular/core';

export interface IBladeComponent {
  id: number;
  title: string;
  isDirty: boolean;
}

export enum BladeState {
  minimized = 0,
  simple = 1,
  normal = 2,
  maximized = 3,
}

export class BladeParam {
  public key: string;
  public value: any;
}

export interface IBladeArgs {
  id: number;
  metaData: BladeMetaData;
}

export class BladeContext {
  private _params: Array<BladeParam>;

  public get hasParams(): boolean {
    return this._params.length > 0;
  }

  public get params(): Array<BladeParam> {
    return this._params;
  }

  public isEntry: boolean = false;

  public constructor(
    public id: number,
    public metaData: BladeMetaData,
    params?: Array<BladeParam>
  ) {
    if (params) {
      this._params = params;
    } else {
      this._params = new Array<BladeParam>();
    }
  }

  public toBladeArgs(): IBladeArgs {
    return { id: this.id, metaData: this.metaData };
  }
}

export class BladeMetaData {
  public constructor(public key: string, public component: Type<any>) { }
}
