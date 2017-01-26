import { Component, Type } from '@angular/core';

import { IBlade } from './../blades/index';

@Component({
  selector: 'tw-list',
  template: `
  <h1>Blader List</h1>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
    <li>E</li>
    <li>F</li>
    <li>G</li>
    <li>H</li>
    <li>I</li>
    <li>J</li>
    <li>K</li>
    <li>L</li>
  </ul>
  <p>
    I just listed some characters.
  </p>`
})
export class ListComponent implements IBlade {
  public get key(): string {
    return 'ListComponent';
  }

  public get title(): string {
    return 'List';
  }

  public get component(): Type<any> {
    return ListComponent;
  }
}
