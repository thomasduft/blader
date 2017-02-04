import { Type } from '@angular/core';

export enum BladeState {
  minimized = 0,
  simple = 1,
  normal = 2,
  maximized = 3,
}

export class Blade {
  public id: number;
  public title: string = 'notitle';
  public isDirty: boolean = false;
  public constructor(
    public key: string,
    public component: Type<any>) {
  }
}

export class BladeParam {
  public key: string;
  public value: any;
}

export interface IBladeArgs {
  id: number;
  blade: Blade;
}

export class BladeContext {
  private _params: Array<BladeParam>;

  public get hasParams(): boolean {
    return this._params.length > 0;
  }

  public get params(): Array<BladeParam> {
    return this._params;
  }

  public constructor(
    public id: number,
    public blade: Blade,
    params?: Array<BladeParam>
  ) {
    if (params) {
      this._params = params;
    } else {
      this._params = new Array<BladeParam>();
    }
  }

  public toBladeArgs(): IBladeArgs {
    return { id: this.id, blade: this.blade };
  }
}

export class BladeMetaData {
  public constructor(public key: string, public component: Type<any>) { }
}
