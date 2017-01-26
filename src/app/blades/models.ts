import { Type } from '@angular/core';

export enum BladeState {
  minimized = 0,
  simple = 1,
  normal = 2,
  maximized = 3,
}

export interface IBlade {
  key: string;
  component: Type<any>;
}

export interface IBladeParam {
  key: string;
  value: any;
}

export interface IBladeContext {
  key: string;
  component: Type<any>;
  params?: Array<IBladeParam>;
}

export class BladeContext implements IBladeContext {
  public get hasParams(): boolean {
    return this.params ? this.params.length > 0 : false;
  }

  public constructor(
    public key: string,
    public component: Type<any>,
    public params?: Array<IBladeParam>
  ) {
    if (!params) {
      this.params = new Array<IBladeParam>();
    }
  }
}

export class BladeMetaData {
  public constructor(public key: string, public component: Type<any>) { }
}

export class UniqueIdCreator {
  /**
   * Returns a unique id -> guid
   * 
   * @returns string
   */
  public static getGuid(): string {
    let date = new Date().getTime();
    let guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      /* tslint:disable */
      let random = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
      /* tslint:enable */
    });
    return guid;
  }
}
