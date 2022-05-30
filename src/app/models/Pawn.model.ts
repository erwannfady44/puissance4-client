import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class PawnModel  {
  private _color!: number;
  private _column!: number;
  private _row!: number;

  constructor() {
  }

  get color(): number {
    return this._color;
  }

  set color(value: number) {
    this._color = value;
  }

  get column(): number {
    return this._column;
  }

  set column(value: number) {
    this._column = value;
  }

  get row(): number {
    return this._row;
  }

  set row(value: number) {
    this._row = value;
  }
}

export class NullPawnModel extends PawnModel {
  constructor() {
    super();
  }
}
