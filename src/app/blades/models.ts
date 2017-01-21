import { Type } from '@angular/core';

export enum BladeState {
  minimized = 0,
  simple = 1,
  normal = 2,
  maximized = 3,
}

export interface IBlade {
  key: string;
  title: string;
  component: Type<any>;
}
