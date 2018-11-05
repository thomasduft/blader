import { Type } from '@angular/core';

export interface IBladeComponent {
  id: number;
  title: string;
  isDirty: boolean;
}

export enum BladeState {
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

  public toBladeArgs(): IBladeArgs {
    return { id: this.id, metaData: this.metaData };
  }
}

export class BladeMetaData {
  public isLazy = false;

  public constructor(
    public key: string,
    public component: Type<any>,
    public factoryFn?: Function
  ) {
    this.isLazy = this.factoryFn !== undefined;
  }
}
